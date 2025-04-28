import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import TextEditor from '@/shared/components/TextEditor'
import ImageUpload from '@/shared/components/ImageUpload'
import { useQuery } from '@tanstack/react-query'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { uploadSingleFile } from '@/services/FileUploadServices'
import { useEffect, useState } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import {
  FormProgramDto,
  getProgramDetail,
  programKey,
  updateProgram,
} from '@/services/ProgramServices'
import { charityKey, getAllCharities } from '@/services/CharityServices'
import { Charity } from '@/types/charity.type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams } from 'react-router'
import { Program } from '@/types/programs.type'
import { isSameFile, urlToFileAuto } from '../../utils/helper'
import queryClient from '@/config/reactQuery'

const UpdateProgramSchema = z.object({
  name: z.string().min(1, { message: 'Tên chương trình không được để trống.' }),
  descriptions: z.string().min(1, { message: 'Mô tả không được để trống.' }),
  target: z.string(),
  avatar: z.instanceof(File, { message: 'Vui lòng chọn 1 ảnh đại diện.' }),
  charityId: z.number().refine((val) => !isNaN(val), {
    message: 'ID tổ chức từ thiện phải là số.',
  }),
})

const UpdateProgram = () => {
  const { programId = 0 } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [originalAvatarFile, setOriginalAvatarFile] = useState<File | null>(
    null
  )

  const form = useForm<z.infer<typeof UpdateProgramSchema>>({
    resolver: zodResolver(UpdateProgramSchema),
    defaultValues: {
      name: '',
      descriptions: '',
    },
  })

  const { data: listCharitiesRes } = useQuery({
    queryKey: [charityKey],
    queryFn: getAllCharities,
  })

  const listCharities: Charity[] = listCharitiesRes?.data || []

  const { data: programDetailRes } = useQuery({
    queryKey: [programKey, 'detail', programId],
    queryFn: () => getProgramDetail(+programId),
  })

  const program: Program = programDetailRes?.data

  useEffect(() => {
    if (program) {
      form.setValue('name', program.name)
      form.setValue('descriptions', program.descriptions)
      form.setValue('charityId', program.charity.id)
      form.setValue('target', program.target ? `${program.target}` : '')
      urlToFileAuto(program.avatar).then((file) => {
        form.setValue('avatar', file)
        setOriginalAvatarFile(file)
      })
    }
  }, [program])

  const onSubmit = async (data: z.infer<typeof UpdateProgramSchema>) => {
    setIsLoading(true)

    try {
      let avatarUrl = program?.avatar || ''
      const avatarChanged = !isSameFile(originalAvatarFile, data.avatar)
      if (avatarChanged) {
        const avatarRes = await uploadSingleFile(data.avatar)

        if (avatarRes.status !== 200) {
          toast.error('Tải ảnh lên thất bại. Vui lòng thử lại sau.')
          return
        }

        avatarUrl = avatarRes.data.url
      }

      const updateProgramData: FormProgramDto = {
        name: data.name,
        descriptions: data.descriptions,
        avatar: avatarUrl,
        charityId: data.charityId,
        target: data.target ? +data.target : null,
      }

      const updateProgramRes = await updateProgram(
        program.id,
        updateProgramData
      )
      if (updateProgramRes.status === 200) {
        toast.success('Cập nhật chương trình thành công.')
        queryClient.removeQueries({
          queryKey: [programKey, 'detail', programId],
        })
        return
      }
      toast.error('Cập nhật chương trình thất bại. Vui lòng thử lại sau.')
    } catch (error) {
      toast.error('Cập nhật chương trình thất bại. Vui lòng thử lại sau.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center flex-col">
      <h2 className="text-3xl font-bold mb-5">
        Cập nhật chương trình từ thiện
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full max-w-xl"
        >
          {/* Tên tổ chức */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên chương trình</FormLabel>
                <FormControl>
                  <Input placeholder="Ví dụ: Chương trình nuôi em" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mô tả */}
          <FormField
            control={form.control}
            name="descriptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <TextEditor
                    placeholder="Thông tin mô tả chương trình từ thiện..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Upload avatar */}
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  <ImageUpload value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="charityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tổ chức từ thiện</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(+value)
                  }}
                  value={`${field.value}`}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Chọn tổ chức từ thiện" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {listCharities.map((charity) => {
                      return (
                        <SelectItem key={charity.id} value={`${charity.id}`}>
                          {charity.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="target"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mục tiêu</FormLabel>
                <FormControl>
                  <Input placeholder="100.000.000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nút submit */}
          <Button disabled={isLoading} className="cursor-pointer" type="submit">
            {isLoading ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              'Cập nhật tổ chức'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UpdateProgram

import { zodResolver } from '@hookform/resolvers/zod'
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
import { useState } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { createProgram, FormProgramDto } from '@/services/ProgramServices'
import { charityKey, getAllCharities } from '@/services/CharityServices'
import { Charity } from '@/types/charity.type'

const CreateProgramSchema = z.object({
  name: z.string().min(1, { message: 'Tên chương trình không được để trống.' }),
  descriptions: z.string().min(1, { message: 'Mô tả không được để trống.' }),
  target: z
    .number()
    .optional()
    .refine((val) => val === undefined || !isNaN(val), {
      message: 'Mục tiêu phải là số.',
    }),
  avatar: z.instanceof(File, { message: 'Vui lòng chọn 1 ảnh đại diện.' }),
  charityId: z.number().refine((val) => !isNaN(val), {
    message: 'ID tổ chức từ thiện phải là số.',
  }),
})

const CreateProgram = () => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof CreateProgramSchema>>({
    resolver: zodResolver(CreateProgramSchema),
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

  const onSubmit = async (data: z.infer<typeof CreateProgramSchema>) => {
    setIsLoading(true)

    try {
      const avatarRes = await uploadSingleFile(data.avatar)
      if (avatarRes.status !== 200) {
        toast.error('Tải ảnh lên thất bại. Vui lòng thử lại sau.')
        return
      }

      const createProgramData: FormProgramDto = {
        name: data.name,
        descriptions: data.descriptions,
        avatar: avatarRes.data.url,
        charityId: data.charityId,
        target: data.target ?? null,
      }

      const createProgramRes = await createProgram(createProgramData)
      if (createProgramRes.status === 201) {
        toast.success('Tạo chương trình thành công.')
        form.reset()
        return
      }
      toast.error('Tạo chương trình thất bại. Vui lòng thử lại sau.')
    } catch (error) {
      toast.error('Tạo chương trình thất bại. Vui lòng thử lại sau.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center flex-col">
      <h2 className="text-3xl font-bold mb-5">Tạo chương trình từ thiện mới</h2>
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
                  <ImageUpload onChange={field.onChange} />
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
                  defaultValue={`${field.value}`}
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
                  <Input
                    placeholder="100.000.000"
                    {...field}
                    onChange={(e) => {
                      field.onChange(+e.target.value)
                    }}
                  />
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
              'Tạo tổ chức'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreateProgram

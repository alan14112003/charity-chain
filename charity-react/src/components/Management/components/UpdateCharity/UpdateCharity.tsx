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
import http from '@/config/http'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { uploadSingleFile } from '@/services/FileUploadServices'
import {
  charityKey,
  FormCharityDto,
  getCharityDetail,
  updateCharity,
} from '@/services/CharityServices'
import { useEffect, useState } from 'react'
import { LoaderCircleIcon } from 'lucide-react'
import { useParams } from 'react-router'
import { BankInfo, Charity } from '@/types/charity.type'
import { isSameFile, urlToFileAuto } from '../../utils/helper'
import queryClient from '@/config/reactQuery'

const UpdateCharitySchema = z.object({
  name: z.string().min(1, { message: 'Tên tổ chức không được để trống.' }),
  detail: z.string().min(1, { message: 'Mô tả không được để trống.' }),
  avatar: z.instanceof(File, { message: 'Vui lòng chọn 1 ảnh đại diện.' }),
  bank_name: z
    .string()
    .min(1, { message: 'Ngân hàng thụ hưởng không được để trống.' }),
  bank_account_number: z
    .string()
    .min(1, { message: 'Số tài khoản không được để trống.' }),
  bank_account_name: z
    .string()
    .min(1, { message: 'Chủ tài khoản không được để trống.' }),
})

const UpdateCharity = () => {
  const { charityId = '' } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [originalAvatarFile, setOriginalAvatarFile] = useState<File | null>(
    null
  )

  const form = useForm<z.infer<typeof UpdateCharitySchema>>({
    resolver: zodResolver(UpdateCharitySchema),
    defaultValues: {
      name: '',
      detail: '',
      bank_name: '',
      bank_account_number: '',
      bank_account_name: '',
    },
  })

  const { data: charityRes } = useQuery({
    queryKey: [charityKey, 'detail', charityId],
    queryFn: () => {
      return getCharityDetail(+charityId)
    },
  })

  const charity: Charity = charityRes?.data || null

  const { data: banksRes } = useQuery({
    queryKey: ['banks'],
    queryFn: async () => {
      const res = await http.get('https://api.vietqr.io/v2/banks')
      return res.data
    },
  })

  useEffect(() => {
    if (charity) {
      const bank: BankInfo = JSON.parse(charity.qr_code)

      form.setValue('name', charity.name)
      form.setValue('detail', charity.detail)
      form.setValue('bank_name', bank.bank_name)
      form.setValue('bank_account_number', bank.bank_account_number)
      form.setValue('bank_account_name', bank.bank_account_name)
      urlToFileAuto(charity.avatar).then((file) => {
        form.setValue('avatar', file)
        setOriginalAvatarFile(file)
      })
    }
  }, [charity])

  const banks = banksRes?.data || []

  const onSubmit = async (data: z.infer<typeof UpdateCharitySchema>) => {
    setIsLoading(true)

    try {
      let avatarUrl = charity?.avatar || ''
      const avatarChanged = !isSameFile(originalAvatarFile, data.avatar)
      if (avatarChanged) {
        const avatarRes = await uploadSingleFile(data.avatar)

        if (avatarRes.status !== 200) {
          toast.error('Tải ảnh lên thất bại. Vui lòng thử lại sau.')
          return
        }

        avatarUrl = avatarRes.data.url
      }

      const updateCharityData: FormCharityDto = {
        name: data.name,
        detail: data.detail,
        avatar: avatarUrl,
        qr_code: JSON.stringify({
          bank_name: data.bank_name,
          bank_account_number: data.bank_account_number,
          bank_account_name: data.bank_account_name,
        }),
      }

      const updateCharityRes = await updateCharity(
        charity.id,
        updateCharityData
      )

      if (updateCharityRes.status === 200) {
        toast.success('Sửa tổ chức thành công.')
        queryClient.removeQueries({
          queryKey: [charityKey, 'detail', charityId],
        })
        return
      }
      toast.error('Sửa tổ chức thất bại. Vui lòng thử lại sau.')
    } catch (error) {
      toast.error('Sửa tổ chức thất bại. Vui lòng thử lại sau.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center flex-col">
      <h2 className="text-3xl font-bold mb-5">Sửa tổ chức từ thiện </h2>
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
                <FormLabel>Tên tổ chức</FormLabel>
                <FormControl>
                  <Input placeholder="Ví dụ: Quỹ Trái Đất Xanh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Mô tả */}
          <FormField
            control={form.control}
            name="detail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <TextEditor
                    placeholder="Thông tin mô tả tổ chức từ thiện..."
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
            name="bank_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ngân hàng thụ hưởng</FormLabel>
                {banks && (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn ngân hàng thụ hưởng" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {banks.map((bankIt: any) => {
                        return (
                          <SelectItem key={bankIt.bin} value={bankIt.bin}>
                            {bankIt.shortName}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bank_account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số tài khoản</FormLabel>
                <FormControl>
                  <Input placeholder="VD: 0123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bank_account_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên chủ tài khoản</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Viết hoa không dấu VD: NGUYEN VAN A"
                    {...field}
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
              'sửa tổ chức'
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default UpdateCharity

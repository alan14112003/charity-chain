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

const CreateCharitySchema = z.object({
  name: z.string().min(1, { message: 'Tên tổ chức không được để trống.' }),
  detail: z.string().min(1, { message: 'Mô tả không được để trống.' }),
  avatar: z.instanceof(FileList).refine((files) => files.length === 1, {
    message: 'Vui lòng chọn 1 ảnh đại diện.',
  }),
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

function CreateCharity() {
  const form = useForm<z.infer<typeof CreateCharitySchema>>({
    resolver: zodResolver(CreateCharitySchema),
    defaultValues: {
      name: '',
      detail: '',
      bank_name: '',
      bank_account_number: '',
      bank_account_name: '',
    },
  })

  function onSubmit(data: z.infer<typeof CreateCharitySchema>) {
    const avatarFile = data.avatar[0]

    console.log(data)

    // toast({
    //   title: 'Dữ liệu đã nhập:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white overflow-x-auto">
    //       <code>
    //         {JSON.stringify({ ...data, avatar: avatarFile.name }, null, 2)}
    //       </code>
    //     </pre>
    //   ),
    // })

    // TODO: Gửi formData lên server nếu muốn upload file thật
    // const formData = new FormData()
    // formData.append("name", data.name)
    // formData.append("detail", data.detail)
    // formData.append("avatar", avatarFile)
    // formData.append("bank_name", data.bank_name)
    // ...
  }

  return (
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
                <Input
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
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    field.onChange(e.target.files)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* QR Code - Thông tin tài khoản */}
        <FormField
          control={form.control}
          name="bank_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngân hàng thụ hưởng</FormLabel>
              <FormControl>
                <Input placeholder="VD: Vietcombank" {...field} />
              </FormControl>
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
                <Input placeholder="VD: Nguyễn Văn A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nút submit */}
        <Button type="submit">Tạo tổ chức</Button>
      </form>
    </Form>
  )
}

export default CreateCharity

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { charityKey, getAllCharities } from '@/services/CharityServices'
import { Charity } from '@/types/charity.type'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

const CharityManagement = () => {
  const naviage = useNavigate()
  const handleNavigate = (url: string) => {
    naviage(url)
  }

  const { data: listCharitiesRes } = useQuery({
    queryKey: [charityKey],
    queryFn: getAllCharities,
  })

  const listCharities: Charity[] = listCharitiesRes?.data || []

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Quản lý tổ chức từ thiện</h2>

      <Button
        className="mb-5 cursor-pointer"
        variant="outline"
        onClick={() => handleNavigate('/management/charities/add')}
      >
        Thêm tổ chức từ thiện
      </Button>

      <Table className="border border-gray-300 rounded-md">
        <TableCaption>Danh sách các tổ chức từ thiện</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Ảnh đại diện</TableHead>
            <TableHead>Tên tổ chức</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listCharities.map((charity) => (
            <TableRow key={charity.id} className="border-b border-gray-200">
              <TableCell>{charity.id}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    className="w-10 h-10"
                    src={charity.avatar}
                    alt={charity.name}
                  />
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{charity.name}</TableCell>
              <TableCell className="flex justify-end gap-10">
                <Button
                  className="cursor-pointer"
                  variant={'outline'}
                  onClick={() =>
                    handleNavigate(`/management/charities/${charity.id}`)
                  }
                >
                  Sửa
                </Button>
                <Button className="cursor-pointer" variant={'destructive'}>
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default CharityManagement

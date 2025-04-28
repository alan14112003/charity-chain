import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
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
import queryClient from '@/config/reactQuery'
import {
  deleteProgram,
  getAllPrograms,
  programKey,
} from '@/services/ProgramServices'
import { Program } from '@/types/programs.type'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

const ProgramManagement = () => {
  const naviage = useNavigate()
  const handleNavigate = (url: string) => {
    naviage(url)
  }

  const { data: listProgramsRes } = useQuery({
    queryKey: [programKey],
    queryFn: getAllPrograms,
  })

  const listPrograms: Program[] = listProgramsRes?.data || []

  const handleDeteprogram = async (programId: number) => {
    const res = await deleteProgram(programId)
    if (res.status !== 200) {
      toast.error('Lỗi khi xóa tổ chức từ thiện')
      return
    }

    queryClient.refetchQueries({
      queryKey: [programKey],
    })

    toast.success('Xóa tổ chức từ thiện thành công')
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Quản lý chương trình từ thiện</h2>

      <Button
        className="mb-5 cursor-pointer"
        variant="outline"
        onClick={() => handleNavigate('/management/programs/create')}
      >
        Thêm chương trình từ thiện
      </Button>

      <Table className="border border-gray-300 rounded-md">
        <TableCaption>Danh sách các tổ chức từ thiện</TableCaption>
        <TableHeader>
          <TableRow className="border-b border-gray-200">
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Ảnh đại diện</TableHead>
            <TableHead className="w-64">Tên chương trình</TableHead>
            <TableHead className="w-[100px]">code</TableHead>
            <TableHead className="w-[100px]">Số lượt quyên góp</TableHead>
            <TableHead className="w-[100px]">tổng số tiền thu được</TableHead>
            <TableHead className="w-[100px]">mục tiêu</TableHead>
            <TableHead className="">tổ chức từ thiện</TableHead>
            <TableHead className="text-center">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listPrograms.map((program) => (
            <TableRow key={program.id} className="border-b border-gray-200">
              <TableCell>{program.id}</TableCell>
              <TableCell>
                <img className="w-32" src={program.avatar} alt={program.name} />
              </TableCell>
              <TableCell className="font-medium text-justify whitespace-normal">
                {program.name}
              </TableCell>
              <TableCell className="">{program.code}</TableCell>
              <TableCell className="">{program.donateCount}</TableCell>
              <TableCell className="">{program.total}</TableCell>
              <TableCell className="">{program.target ?? 'Không'}</TableCell>
              <TableCell className="text-justify whitespace-normal">
                {program.charity.name}
              </TableCell>
              <TableCell className="flex justify-end gap-10">
                <Button
                  className="cursor-pointer"
                  variant={'outline'}
                  onClick={() =>
                    handleNavigate(`/management/programs/${program.id}`)
                  }
                >
                  Sửa
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button className="cursor-pointer" variant={'destructive'}>
                      Xóa
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bạn có chắc chắn muốn xóa ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Hành động này không thể khôi phục, hãy chắc chắn rằng
                        bạn muốn xóa trước khi ấn nút tiếp tục
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Hủy
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="cursor-pointer"
                        onClick={() => {
                          handleDeteprogram(program.id)
                        }}
                      >
                        Tiếp tục
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default ProgramManagement

import { getAllPrograms, programKey } from '@/services/ProgramServices'
import { Program } from '@/types/programs.type'
import { useQuery } from '@tanstack/react-query'
import ProgramItem from '../ProgramItem'

const ListPrograms = () => {
  const { data: listProgramsRes } = useQuery({
    queryKey: [programKey],
    queryFn: getAllPrograms,
  })

  const listPrograms: Program[] = listProgramsRes?.data || []
  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {listPrograms.map((program) => (
        <ProgramItem key={program.id} program={program} />
      ))}
    </div>
  )
}

export default ListPrograms

import { getAllPrograms, programKey } from '@/services/ProgramServices'
import { Program } from '@/types/programs.type'
import { useQuery } from '@tanstack/react-query'
import ProgramItem from './ProgramItem'

const ListPrograms = () => {
  const { data: listProgramsRes } = useQuery({
    queryKey: [programKey],
    queryFn: getAllPrograms,
  })

  const listPrograms: Program[] = listProgramsRes?.data || []
  return (
    <div className="mt-8">
      {listPrograms.map((program) => (
        <ProgramItem key={program.id} program={program} />
      ))}
    </div>
  )
}

export default ListPrograms

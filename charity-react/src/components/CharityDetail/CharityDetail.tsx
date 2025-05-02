import { charityKey, getCharityDetail } from '@/services/CharityServices'
import { Charity } from '@/types/charity.type'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

const CharityDetail = () => {
  const { charityId = 0 } = useParams()
  const { data: charityDetailRes } = useQuery({
    queryKey: [charityKey, 'detail', charityId],
    queryFn: () => getCharityDetail(+charityId),
  })

  const charityDetail: Charity = charityDetailRes?.data

  return (
    <>
      {charityDetail && (
        <>
          <title>{charityDetail.name}</title>
          <meta name="description" content={charityDetail.detail} />
        </>
      )}
      <div className="my-10">
        {charityDetail && (
          <>
            <div className="mt-5 flex gap-12">
              <img
                className="w-56 h-56 object-cover"
                src={charityDetail.avatar}
                alt={charityDetail.name}
              />
              <h1 className="uppercase font-bold text-2xl pr-2">
                {charityDetail.name}
              </h1>
            </div>
            <div className="mt-5 text-lg font-bold">Thông tin tổ chức</div>
            <div
              className="revert-tailwind"
              dangerouslySetInnerHTML={{
                __html: charityDetail.detail,
              }}
            ></div>
          </>
        )}
      </div>
    </>
  )
}

export default CharityDetail

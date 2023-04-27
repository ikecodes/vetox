import DetailBox from "@/components/DetailsBox"
import Loader from "@/components/Loader"
import { useGetDashboard } from "@/hooks/admin.hook"
import React from "react"
import { BiMessageDetail } from "react-icons/bi"
import { FiShoppingCart, FiUsers } from "react-icons/fi"
import { TbArticle, TbShoppingCartOff } from "react-icons/tb"

const Dashboard = () => {
  const { data, isLoading } = useGetDashboard()
  const stats = data?.data?.data ?? null
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='row bg-white p-5'>
          <DetailBox
            icon={<FiShoppingCart size={30} color='#fff' />}
            iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
            bg='#FFF8E5'
            value={stats?.totalInStock ?? 0}
            textColor='#000'
            text='in stock'
          />
          <DetailBox
            icon={<TbShoppingCartOff size={30} color='#fff' />}
            iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
            bg='#FFF8E5'
            value={stats?.totalOutOfStock ?? 0}
            textColor='#000'
            text='out of stock'
          />
          <DetailBox
            icon={<TbArticle size={30} color='#fff' />}
            iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
            bg='#FFF8E5'
            value={stats?.totalArticles ?? 0}
            textColor='#000'
            text='articles'
          />
          <DetailBox
            icon={<FiUsers size={30} color='#fff' />}
            iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
            bg='#FFF8E5'
            value={stats?.totalUsers ?? 0}
            textColor='#000'
            text='users'
          />
          <DetailBox
            icon={<BiMessageDetail size={30} color='#fff' />}
            iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
            bg='#FFF8E5'
            value={stats?.totalMessages ?? 0}
            textColor='#000'
            text='messages'
          />
        </div>
      )}
    </div>
  )
}

export default Dashboard

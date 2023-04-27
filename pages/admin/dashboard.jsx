import DetailBox from "@/components/DetailsBox"
import { useGetDashboard } from "@/hooks/admin.hook"
import React from "react"
import { BiMessageDetail } from "react-icons/bi"
import { FiShoppingCart, FiUsers } from "react-icons/fi"
import { TbArticle, TbShoppingCartOff } from "react-icons/tb"

const Dashboard = () => {
  const { data } = useGetDashboard()
  console.log(data?.data?.data)
  return (
    <div>
      <div className='row bg-white p-5'>
        <DetailBox
          icon={<FiShoppingCart size={30} color='#fff' />}
          iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
          bg='#FFF8E5'
          value={0}
          textColor='#000'
          text='products in stock'
        />
        <DetailBox
          icon={<TbShoppingCartOff size={30} color='#fff' />}
          iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
          bg='#FFF8E5'
          value={0}
          textColor='#000'
          text='products out of stock'
        />
        <DetailBox
          icon={<TbArticle size={30} color='#fff' />}
          iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
          bg='#FFF8E5'
          value={0}
          textColor='#000'
          text='Total articles'
        />
        <DetailBox
          icon={<FiUsers size={30} color='#fff' />}
          iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
          bg='#FFF8E5'
          value={0}
          textColor='#000'
          text='Total users'
        />
        <DetailBox
          icon={<BiMessageDetail size={30} color='#fff' />}
          iconBg='linear-gradient(180deg, #048A42 -50%, #50E680 182.35%)'
          bg='#FFF8E5'
          value={0}
          textColor='#000'
          text='messages recieved'
        />
      </div>
    </div>
  )
}

export default Dashboard

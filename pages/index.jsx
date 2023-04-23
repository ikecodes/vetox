import BrandsSlider from "@/components/Home/BrandsSlider"
import Customers from "@/components/Home/Customers"
import EquipmentBanner from "@/components/Home/EquipmentBanner"
import Featured from "@/components/Home/Featured"
import Hero from "@/components/Home/Hero"
import HomeBlog from "@/components/Home/HomeBlog"
import HomeProductAnimation from "@/components/Home/HomeProductAnimation"
import ProductSlider from "@/components/Home/ProductSlider"
import Services from "@/components/Home/Services"
import Solutions from "@/components/Home/Solutions"
import Head from "next/head"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Vetox Global Medical Services</title>
        <meta
          name='description'
          content='This is Vetox global medical services official website'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero />
      <Services />
      <Customers />
      <Solutions />
      <ProductSlider />
      <EquipmentBanner />
      <Featured />
      <HomeProductAnimation />
      <BrandsSlider />
      <HomeBlog />
    </div>
  )
}

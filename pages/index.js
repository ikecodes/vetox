import Hero from "@/components/Hero";
import Head from "next/head";
import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Vetox Global Medical Services</title>
        <meta
          name='description'
          content='This is Vetox global medical services official website'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Hero />
      {/* <h1 className='text-primary text-center'>
        Welcome to Vetox Global Medical
      </h1> */}
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

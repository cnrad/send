import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function Home() {

    const sendMessage = () => {

        let name = document.querySelector("#nameField") as HTMLInputElement;
        let message = document.querySelector("#messageField") as HTMLInputElement;

        axios.post("/api/sendMessage", {
            name: name.value,
            message: message.value
        })

    }


    return (
        <>

            <Content>
                <Header>
                    send.cnrad.dev
                </Header>
                <Paragraph>
                    Send a message to me on Discord using webhooks!
                </Paragraph>
                <Container>
                    <NameField id="nameField" placeholder="Your name"/>
                    <MessageField id="messageField" placeholder="Your message here!" />
                    <SendBtn onClick={sendMessage}/>
                </Container>
            </Content>
        </>
    )
}

const Content = styled.div`
    width: 100%;
    height: 100vh;
    inset: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: url("")
`

const Header = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`

const Paragraph = styled.div`
    font-size: 1rem;
`

const Container = styled.div`
    width: 15rem;
    height: 10rem;
    background: #fff;
    border-radius: 15px;
    padding: 2rem;
`

const NameField = styled.input`
    width: 100%;
    height: 2rem;
`

const MessageField = styled.input`
    width: 100%;
    height: 10rem;
`

const SendBtn = styled.button`
    padding: 1rem;
`
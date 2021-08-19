import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import WebGLAnim from '../src/webgl';

export default function Home() {

    let [errMsg, setErrMsg] = useState("")

    const sendMessage = async () => {

        let name = document.querySelector("#nameField") as HTMLInputElement;
        let message = document.querySelector("#messageField") as HTMLInputElement;

        let response = await axios.post("/api/sendMessage", {
            name: name.value,
            message: message.value
        })

        if(response.data.result === "MESSAGE_TOO_LONG") return setErrMsg("Error: Message length over 500 characters")
        if(response.data.result === "NAME_TOO_LONG") return setErrMsg("Error: Name length over 30 characters")

        return setErrMsg("Your message was successfully sent!")

    }

    useEffect(() => {
        WebGLAnim();
    })

    return (
        <>
            <Background id="gradient-canvas"/>

            <Content>
                <Header>
                    send.<CnradSpan>cnrad</CnradSpan>.dev
                </Header>
                <Paragraph>
                    💬 Send a message to me on Discord using webhooks
                </Paragraph>
                <Container>
                    <NameField type="text" id="nameField" placeholder="Your name" maxLength={30} />
                    <MessageField id="messageField" placeholder="Your message here!" maxLength={500} />
                    <ErrorMessage style={{color: errMsg == "Your message was successfully sent!" ? "#0051ff" : "#df4747"}}>{errMsg}</ErrorMessage>
                    <SendBtn onClick={sendMessage} whileTap={{scale: 0.97}}>Send Message</SendBtn>
                </Container>
            </Content>
        </>
    )
}

const CnradSpan = styled.span`
    color: #fff;
    filter: drop-shadow(0 0 3px #fff);
`

const Background = styled(motion.canvas)`
    width: 100vw;
    height: 100vh;
    position: absolute;
    inset: 0;
`

const Content = styled.div`
    position: absolute;
    width: 100%;
    height: 100vh;
    inset: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
`

const Header = styled.div`
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #fcfcfc;
`

const Paragraph = styled.div`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 50rem;
    height: 30rem;
    background: #fff;
    border-radius: 15px;
    padding: 2rem;
`

const NameField = styled.input`
    width: 100%;
    height: auto;

    font-family: "Inter";
    font-weight: 500;
    font-size: 1rem;

    outline: none;
    background: #ddd;
    border-radius: 5px;
    border: solid 2px #ddd;
    padding: 0.5rem;
    transition: all 0.15s ease-in-out;

    &:focus {
        border: solid 2px #0084ff;
    }

    margin-bottom: 1rem;
`

const MessageField = styled.textarea`
    width: 100%;
    height: 50%;

    font-family: "Inter";
    font-size: 1rem;

    outline: none;
    background: #ddd;
    border-radius: 5px;
    border: solid 2px #ddd;
    padding: 0.5rem;
    transition: all 0.15s ease-in-out;
    resize: none;

    &:focus {
        border: solid 2px #0084ff;
    }
`

const ErrorMessage = styled.p`
    font-size: 1rem;
    height: 1.25rem;
    font-weight: 500;
    width: 100%;
    text-align: center;

    margin-bottom: 1rem;
`

const SendBtn = styled(motion.button)`
    padding: 1rem 1.5rem;
    border: none;
    background: #001aff;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    border-radius: 15px;
    letter-spacing: 0.05rem;
`
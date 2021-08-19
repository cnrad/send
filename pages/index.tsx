import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function Home() {

    let [errMsg, setErrMsg] = useState("")

    const sendMessage = async () => {

        let name = document.querySelector("#nameField") as HTMLInputElement;
        let message = document.querySelector("#messageField") as HTMLInputElement;

        if(name.value == "" || message.value == "") return setErrMsg("Error: Field empty");

        let response = await axios.post("/api/sendMessage", {
            name: name.value,
            message: message.value
        })

        if(response.data.result === "MESSAGE_TOO_LONG") return setErrMsg("Error: Message length over 500 characters");
        if(response.data.result === "NAME_TOO_LONG") return setErrMsg("Error: Name length over 30 characters");
        if(response.data.result === "MESSAGE_EMPTY") return setErrMsg("Error: Message empty");
        if(response.data.result === "NAME_EMPTY") return setErrMsg("Error: Name empty");
        if(response.data.result === "DISCORD_API_ERROR") return setErrMsg("Error: Could not connect to Discord");

        return setErrMsg("Your message was successfully sent!");
    }

    const containerAnim = {
        init: {
            opacity: 1
        },
        load: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const childAnim = {
        init: {
            opacity: 0,
            y: 50
        },
        load: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.75,
                ease: "easeInOut"
            }
        }
    }

    return (
        <>
            <Head>
                <title>💬 send.cnrad.dev</title>
            </Head>

            <Background src="/background.jpg"/>

            <Content initial="init" animate="load" variants={containerAnim}>
                <Header variants={childAnim}>
                    send.<CnradSpan>cnrad</CnradSpan>.dev
                </Header>
                <Paragraph variants={childAnim}>
                    💬 Send a message to me on Discord using webhooks
                </Paragraph>
                <Container variants={childAnim}>
                    <NameField type="text" id="nameField" placeholder="Your name" maxLength={30} />
                    <MessageField id="messageField" placeholder="Your message" maxLength={900} />
                    <ErrorMessage style={{color: errMsg == "Your message was successfully sent!" ? "#0051ff" : "#df4747"}}>{errMsg}</ErrorMessage>
                    <SendBtn onClick={sendMessage} whileTap={{scale: 0.97}} transition={{duration: 0.1, ease: "easeInOut"}}>Send Message</SendBtn>
                </Container>
            </Content>
        </>
    )
}

const Background = styled.img`
    z-index: 0;
    position: fixed;
    inset: 0;
    object-fit: cover;
    
    width: 100vw;
    height: auto;
    min-height: 70rem;
    pointer-events: none;
`

const CnradSpan = styled.span`
    color: #fff;
    filter: drop-shadow(0 0 3px #fff);
`

const Content = styled(motion.div)`
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

const Header = styled(motion.div)`
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #fcfcfc;

    @media (max-width: 500px) {
        font-size: 3rem;
    }
`

const Paragraph = styled(motion.div)`
    font-size: 1.5rem;
    margin-bottom: 2.5rem;
    text-align: center;

    @media (max-width: 500px) {
        font-size: 1.25rem;
    }
`

const Container = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    width: 75%;
    min-width: 10rem;
    max-width: 50rem;
    height: auto;
    background: #fff;
    border-radius: 15px;
    padding: 2rem;
    filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))
`

const NameField = styled.input`
    width: 100%;
    height: auto;

    font-family: "Inter";
    font-weight: 500;
    font-size: 1rem;

    outline: none;
    background: #ddd;
    border-radius: 10px;
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
    min-height: 13rem;
    font-family: "Inter";
    font-size: 1rem;

    outline: none;
    background: #ddd;
    border-radius: 10px;
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

    @media (max-width: 500px) {
        font-size: 0.85rem;
    }
`

const SendBtn = styled(motion.button)`
    padding: 1rem 1.5rem;
    border: none;

    background: #2f6cfa;

    font-family: "Inter";
    font-weight: 500;
    font-size: 1rem;
    color: #fff;
    border-radius: 15px;
    letter-spacing: 0.01rem;
    cursor: pointer;
    transition: all 0.25s ease-in-out;

    &:hover {
        box-shadow: 0 0 10px 0 #2f6cfa;
    }
`
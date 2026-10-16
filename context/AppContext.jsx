"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const AppContext = createContext();

export const useAppContext = ()=>{
    return useContext(AppContext)
}

export const AppContextProvider = ({children})=>{
    const [user] = useState({
        id: "dummy_user_123",
        fullName: "Dummy User",
        email: "dummy@example.com"
    });

    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);

    const createNewChat = async ()=>{
        try {
            await axios.post('/api/chat/create', {})
            await fetchUsersChats();
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchUsersChats = async ()=>{
        try {
            const {data} = await axios.get('/api/chat/get')
            if(data.success){
                console.log(data.data);
                setChats(data.data)

                 // If the user has no chats, create one
                 if(data.data.length === 0){
                    await createNewChat();
                    return fetchUsersChats();
                 }else{
                    // sort chats by updated date
                    data.data.sort((a, b)=> new Date(b.updatedAt) - new Date(a.updatedAt));

                     // set recently updated chat as selected chat
                     setSelectedChat(data.data[0]);
                     console.log(data.data[0]);
                 }
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchUsersChats();
    }, [])

    const value = {
        user,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
        fetchUsersChats,
        createNewChat
    }
    
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
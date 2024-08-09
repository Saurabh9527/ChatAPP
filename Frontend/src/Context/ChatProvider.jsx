
import { createContext , useEffect , useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {

    const [ user, setUser ] = useState('');
    const [ selectedChat, setSelectedChat ] = useState('');
    const [ chats, setChats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const info = JSON.parse(localStorage.getItem('userInfo'));
        const userInfo = info?.data;
        setUser(userInfo);

        if(!userInfo) {
            navigate('/');
        };

    }, [navigate]);
    
    return (
        <ChatContext.Provider
         value={ { 
            user, 
            setUser, 
            selectedChat, 
            setSelectedChat, 
            chats, 
            setChats 
        } }
         >
            { children }
        </ChatContext.Provider>
    );
};



export default ChatProvider;
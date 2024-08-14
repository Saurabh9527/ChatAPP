
import React, { useMemo } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../utils/constant';
import { debounce } from '../utils/debounce';

const useSearchUsers = ( user, setLoading, setSearchResult ) => {
    const fetchUser = async  ( query ) => {
        
        if(!query){
            return;
        }
 
        try {
            setLoading(true);
            const res = await axios.get(`${BACKEND_URL}/api/user?search=${query}`,
                {
                  withCredentials: true,
                  headers: {
                      "Content-Type": "application/json",
                      "Authorization": `Bearer ${user.token}`,
                  },
                });
                const { data } = res;
                //console.log(data);         
                setLoading(false);
                setSearchResult(data);
        } catch (error) {
            console.log(error);
            
            toast({
                title: 'Error Occured!',
                description: "Failed to Load the Search Results",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: 'bottom-left'
              })
        }
    }

    const handleSearch = useMemo(() => debounce((e) =>{
        fetchUser(e.target.value)  
    }, 1000),[]);

    return handleSearch;
}

export default useSearchUsers

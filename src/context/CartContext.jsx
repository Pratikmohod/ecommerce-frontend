import React,{createContext,useContext,useState,useEffect} from 'react'
import { authFetch,getAccessToken } from '../utils/auth';
const CartContext = createContext()
 
export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [cartitems,setCartItems]=useState([]);

    const [total,setTotal]=useState(0);
   
    //Fetch Cart from BE

    const fetchCart = async () => {
        try{
            const response = await authFetch(`${BASEURL}/api/cart/`)
            const data = await response.json();
            setCartItems(data.items  || []);
            setTotal(data.total || 0);

        }catch (error) {
            console.error("Error fetching cart:",error);

      
        }
    }

    useEffect(()=>{
        if (getAccessToken()){
            fetchCart();
        }
    }, []);



    //ADD Product to cart
    const addToCart = async (productId)=>{
        try {
            await authFetch(`${BASEURL}/api/cart/add/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({product_id:productId}),
            });
            fetchCart();    
        } catch (error) {
            console.error("Error adding to cart:",error);

        }
    }
    //Remove Product from cart

    const removeFromCart = async (itemId)=>{
        try{
            await authFetch(`${BASEURL}/api/cart/remove/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({item_id: itemId}),

            });
            fetchCart();

        } catch (error) {
            console.error("Error removing from cart:",error);

        }

    }    
        



    const updateQuantity = async (itemId,quantity)=>{

        try{
            
            if (quantity < 1) {
            await removeFromCart(itemId);
            return;

        }
        await authFetch(`${BASEURL}/api/cart/update/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({item_id:itemId,quantity}),
        });

        fetchCart();
        } catch(error){
            console.error("Error updating quantity:",error);
        
        }
    }
    
    const clearCart =()=>{
        setCartItems([]);
        setTotal(0);

    }

    
    

    
  return (
    <CartContext.Provider value={{ cartitems,total, addToCart, removeFromCart, updateQuantity, clearCart}}>
        {children} 
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
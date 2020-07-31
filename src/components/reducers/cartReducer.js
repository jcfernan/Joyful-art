import Item1 from '../../images/item1.png'
import Item2 from '../../images/item2.png'
import Item3 from '../../images/item3.png'
import Item4 from '../../images/item4.png'
import Item5 from '../../images/item5.png'
import Item6 from '../../images/item6.png'
import Item7 from '../../images/item7.png'
import Item8 from '../../images/item8.png'
import Item9 from '../../images/item9.png'
import Item10 from '../../images/item10.png'
import Item11 from '../../images/item11.png'
import Item12 from '../../images/item12.png'

import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,desc: "Groovy little landscape", price:110,img:Item1},
        {id:2, desc: "Alternate frottage collage assignment for my printmaking class! It’s been interesting navigating a printmaking course without the tools for printmaking, lots of exploration happening!! ", price:80,img: Item2},
        {id:3, desc: "Here’s a bright and happy rainbow for these weird/scary times!! I hope everyone is practicing self care and finding time for things that make them happy!!",price:120,img: Item3},
        {id:4, desc: "Passion Project", price:260,img:Item4},
        {id:5, desc: "Passion Project", price:160,img: Item5},
        {id:6, desc: "These colors make me feel good. It’s important to feel good",price:90,img: Item6},
        {id:7, desc: "BoZone",price:90,img: Item7},
        {id:8, desc: "I love the colors in this piece so much!! ",price:90,img: Item8},
        {id:9, desc: "Pink skies!",price:90,img: Item9},
        {id:10, desc: "Orange you glad",price:90,img: Item10},
        {id:11, desc: "Stacked",price:90,img: Item11},
        {id:12, desc: "Haven’t been feeling inspired to paint lately, my heart and mind have been in a different place I suppose. This is a rock Karen-family portrait I made a few days after my mom died. Trying to use my art as a way to process and think, to grieve and mourn. I see mama in the deep blues and bright purples.",price:90,img: Item12}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer

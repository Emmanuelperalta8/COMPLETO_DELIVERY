import { produce } from 'immer'
import { ActionTypes, Actions } from './actions'
import { OrderInfo } from '../../types/order'

export interface Item {
  id: string
  name: string
  imageUrl: string
  price: number
  quantity: number
}

export interface Order extends OrderInfo {
  id: number
  items: Item[]
}

interface CartState {
  cart: Item[]
  orders: Order[]
}

export function cartReducer(state: CartState, action: Actions): CartState {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return produce(state, (draft) => {
        const itemAlreadyAdded = draft.cart.find(
          (item) => item.id === action.payload.item.id,
        )

        if (itemAlreadyAdded) {
          itemAlreadyAdded.quantity += action.payload.item.quantity
        } else {
          draft.cart.push(action.payload.item)
        }
      })

    case ActionTypes.REMOVE_ITEM:
      return produce(state, (draft) => {
        const itemToRemoveId = draft.cart.findIndex(
          (item) => item.id === action.payload.itemId,
        )
        if (itemToRemoveId > -1) {
          draft.cart.splice(itemToRemoveId, 1)
        }
      })

    case ActionTypes.INCREMENT_ITEM_QUANTITY:
      return produce(state, (draft) => {
        const itemToIncrement = draft.cart.find(
          (item) => item.id === action.payload.itemId,
        )

        if (itemToIncrement) {
          itemToIncrement.quantity += 1
        }
      })

    case ActionTypes.DECREMENT_ITEM_QUANTITY:
      return produce(state, (draft) => {
        const itemToDecrement = draft.cart.find(
          (item) => item.id === action.payload.itemId,
        )

        if (itemToDecrement && itemToDecrement.quantity > 1) {
          itemToDecrement.quantity -= 1
        }
      })

    case ActionTypes.CHECKOUT_CART:
      return produce(state, (draft) => {
        const newOrder = {
          id: new Date().getTime(),
          items: state.cart,
          ...action.payload.order,
        }
        draft.orders.push(newOrder)
        draft.cart = []

        action.payload.callback(`/order/${newOrder.id}/success`)
      })

    default:
      return state
  }
}
"use client" 
import { ClerkLoaded,  SignedIn,  SignInButton, UserButton, useUser } from "@clerk/nextjs"
import Link from "next/link"
import  Form  from "next/form"
import { TrolleyIcon, PackageIcon } from "@sanity/icons"
import useBasketStore from "@/store/store"

function Header () {
  const { user } = useUser()

  const itemsCount = useBasketStore((state) => state.items.reduce((total, item) => total + item.quantity, 0))

  console.log(user)

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey()
      console.log(response)
    } catch (err) {
      console.error("Error:", JSON.stringify(err, null, 2))
    }
  }

  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-green-800 hover:opacity-50 cursor-pointer mx-auto sm:mx-0"   
        >
          TeaTranquility
        </Link>

        <Form
          action="/search"
          className="w-full sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input type="text" name="search" placeholder="Search..." className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-green-800" />
        </Form>

        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Link href="/basket" className="flex flex-1 relative justify-center  sm:flex-none items-center space-x-2 bg-green-800 py-2 font-bold text-white hover:bg-green-700 px-4 rounded">
            <TrolleyIcon className="w-6 h-6"/>
            <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center">{itemsCount}</span>
            <span> My Basket </span>
            
          </Link>

          <ClerkLoaded>
            <SignedIn>
              <Link 
                href="/orders" className="flex flex-1 relative justify-center  sm:flex-none items-center space-x-2 bg-green-800 py-2 font-bold text-white hover:bg-green-700 px-4 rounded">
                <PackageIcon className="w-6 h-6"/>

                <span> My Orders </span>
              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center space-x-2">
                <UserButton />

                <div className="hidden sm:block text-xs">
                  <p className="text-gray-400">Welcome back</p>
                  <p className="font-bold">{user.fullName}</p>
                </div>
              </div>
            ): (
              <SignInButton mode="modal"/>
            )}

            {user?.passkeys.length === 0 && (
              <button onClick={createClerkPasskey}
                className="bg-white hover:bg-green-700 hover:text-white animate-pulse text-green-800 px-4 py-2 rounded border border-green-500">
                  Create Passkey
                </button>
            )}
          </ClerkLoaded>
        </div>
      </div>
    </header>
  )
}

export default Header
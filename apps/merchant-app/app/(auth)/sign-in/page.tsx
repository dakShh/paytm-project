'use client';

// Component imports
import { Button } from '@repo/ui/components/button';

// auth
import { signIn } from 'next-auth/react';

export default function MerchantSignIn() {
    const socialLogin = () => {
        signIn('google');
    };

    return (
        <div className=" container  mx-auto  grid  place-items-center  h-screen ">
            <div className=" w-96  p-5  bg-white   rounded-lg  shadow-lg">
                <div className="text-center mb-10">
                    <div className="font-bold text-3xl">PayTM Merchant</div>
                </div>
                <div className="w-full">
                    <Button className="w-full" onClick={socialLogin}>
                        Google Login{' '}
                    </Button>
                </div>
            </div>
        </div>
    );
}

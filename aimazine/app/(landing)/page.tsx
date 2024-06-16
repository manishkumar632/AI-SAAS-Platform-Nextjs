import { Button } from "@/components/ui/button"
import Link from "next/link"

const LandingPage = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold">This is the landing page</h1>
            <div>
                <Link href="/sign-in">
                    <Button>Sign In</Button>
                </Link>
                <Link href="/sign-up">
                    <Button>Sign Up</Button>
                </Link>

            </div>
        </div>
    )
}
export default LandingPage
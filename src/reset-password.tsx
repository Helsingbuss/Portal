import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import logo from "/public/logo.png"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function ResetPassword() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleResetPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/reset-password",
    })
    if (error) {
      setError(error.message)
    } else {
      setSubmitted(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="flex flex-col items-start w-full max-w-md space-y-4">
        <img src={logo} alt="logo" className="w-[250px] mx-auto" />

        {!submitted ? (
          <>
            <input
              className="w-full h-[52px] rounded-[10px] shadow px-4 text-base"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-postadress"
            />

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="flex justify-between w-full mt-4">
              <div></div>
              <button
                onClick={handleResetPassword}
                className="w-[160px] h-[52px] bg-[#194C66] text-white rounded-full font-semibold text-[15px]"
              >
                Skicka
              </button>
            </div>
          </>
        ) : (
          <div className="text-[#194C66] font-semibold text-[15px] text-center w-full">
            En återställningslänk har skickats till din e-postadress.
          </div>
        )}
      </div>
    </div>
  )
}

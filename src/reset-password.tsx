import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import logo from "/public/logo.png"

const supabase = createClient(
  "https://gfjchjixpsfgxoprdsfx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmamNoaml4cHNmZ3hvcHJkc2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMjYyMjMsImV4cCI6MjA2NDcwMjIyM30.MAl-fl15C6ua-CL3-76UOCwmWs0smNapTvMLmwvT8MQ"
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
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <div className="flex flex-col items-center space-y-4">
        <img src={logo} alt="logo" width={374} height={67} />

        {!submitted ? (
          <div className="w-[433px] space-y-2">
            <label className="text-[#194C66] font-semibold text-[17px] block text-left">
              E-postadress
            </label>
            <input
              className="w-full h-[49px] rounded-[10px] shadow px-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && <div className="text-red-500 text-sm text-left">{error}</div>}

            <div className="flex justify-between items-center mt-4">
              <div></div>
              <button
                onClick={handleResetPassword}
                className="bg-[#194C66] text-white px-6 py-2 rounded-full font-semibold text-[15px]"
              >
                Skicka
              </button>
            </div>
          </div>
        ) : (
          <div className="text-[#194C66] font-semibold text-[15px] text-center">
            En återställningslänk har skickats till din e-postadress.
          </div>
        )}
      </div>
    </div>
  )
}

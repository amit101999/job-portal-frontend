// import React, { useState } from 'react'
// import Nabvar from '../shared/Nabvar'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Button } from "@/components/ui/button"
// import { Link, useNavigate, } from 'react-router-dom'
// import axios from 'axios'
// import { toast } from 'sonner'
// import { Loader2 } from 'lucide-react'




// const Signup = () => {
//     const [input, setInput] = useState({
//         fullname: "",
//         email: "",
//         phoneNumber: "",
//         password: "",
//         role: "",
//         file: ""
//     })

//     const [loading, setLoading] = useState(false)

//     const changeEventHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value })
//     }

//     const changeFileHandler = (e) => {
//         setInput({ ...input, file: e.target.files?.[0] })
//     }

//     const navigate = useNavigate()

//     const submitHandler = async (e) => {
//         e.preventDefault()
//         const formData = new FormData()
//         formData.append("fullname", input.fullname)
//         formData.append("email", input.email)
//         formData.append("password", input.password)
//         formData.append("phoneNumber", input.phoneNumber)
//         formData.append("role", input.role)
//         if (input.file) formData.append("file", input.file)
//         try {
//             setLoading(true)
//             const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 },
//                 withCredentials: true
//             })
//             if (res.data.success) {
//                 toast.success(res.data.message)
//                 navigate('/login')
//             }
//         } catch (err) {
//             console.log("error in register : ", err)
//             toast.success(err.message)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <div>
//             <Nabvar />
//             <div className='flex item-center justify-center max-w-7xl mx-auto '>
//                 <form onSubmit={submitHandler} className='w-1/2 border-2 border-gray-800  p-4 rounded-xl'>
//                     <h1 className='font-bold text-xl mb-5'>Sign up</h1>
//                     <div className='my-2'>
//                         <Label>full name</Label>
//                         <Input type="text"
//                             placeholder="Amit"
//                             name="fullname"
//                             value={input.fullname}
//                             onChange={changeEventHandler} />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Email</Label>
//                         <Input type="text"
//                             placeholder="Amit@gmail.com"
//                             name="email"
//                             value={input.email}
//                             onChange={changeEventHandler} />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Phone Number</Label>
//                         <Input type="text"
//                             placeholder="8630912968"
//                             name="phoneNumber"
//                             value={input.phoneNumber}
//                             onChange={changeEventHandler} />
//                     </div>
//                     <div className='my-2'>
//                         <Label>Password</Label>
//                         <Input type="password"
//                             placeholder="Amit199"
//                             name="password"
//                             value={input.password}
//                             onChange={changeEventHandler}
//                         />
//                     </div>
//                     <div className='flex items-center justify-between'>
//                         <RadioGroup className="flex item-center m-5 gap-4">
//                             <div className="flex items-center space-x-2">
//                                 <Input type="radio"
//                                     name="role"
//                                     value="student"
//                                     className="cursor-pointer"
//                                     checked={input.role === "student"}
//                                     onChange={changeEventHandler}
//                                 />
//                                 <Label htmlFor="option-one">Student</Label>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                                 <Input type="radio"
//                                     name="role"
//                                     value="recruiter"
//                                     className="cursor-pointer"
//                                     checked={input.role === "recruiter"}
//                                     onChange={changeEventHandler} />
//                                 <Label htmlFor="option-two">Recruiter</Label>
//                             </div>
//                         </RadioGroup>
//                         <div className='flex items-center gap-2'>
//                             <Label>Profile</Label>
//                             <Input
//                                 accept="image/*"
//                                 type="file"
//                                 className="cursor-pointer"
//                                 onChange={changeFileHandler}
//                             />
//                         </div>
//                     </div>
//                     {loading ?
//                         (<Button> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> please wait </Button>)
//                         :
//                         (<Button variant="outline" type="submit" className="w-full my-4 bg-sky-700">Signup</Button>)
//                     }
//                     <span>Already have an Account ? <Link to="/login" className='text-blue-600 '>Login</Link></span>
//                 </form>
//             </div>
//         </div >
//     )
// }

// export default Signup



import React, { useState } from 'react'
import Nabvar from '../shared/Nabvar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Link, useNavigate, } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { Mail, Lock, User, Users, Phone, Upload, Sparkles, Loader2, EyeOff, Eye } from 'lucide-react'

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    })

    const [loading, setLoading] = useState(false)

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }


    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("password", input.password)
        formData.append("phoneNumber", input.phoneNumber)
        formData.append("role", input.role)
        if (!input.file) return toast.error("Please uplad a profle image")
        if (input.file) formData.append("file", input.file)
        try {
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/login')
            }
        } catch (err) {
            console.log("error in register : ", err)
            toast.success(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-800 flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Join Us Today</span>
                    </div>
                    <h1 className="text-4xl font-black bg-gradient-to-r from-slate-900 to-purple-900 dark:from-white dark:to-purple-200 bg-clip-text text-transparent">
                        Sign Up
                    </h1>
                    <p className="text-slate-600 dark:text-slate-300 mt-2">
                        Create your account and start your journey
                    </p>
                </div>

                {/* Form Container */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                    <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/50 p-8">
                        <form onSubmit={submitHandler} className="space-y-6">
                            {/* Full Name Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Full Name
                                </label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 dark:text-white placeholder:text-slate-400 transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Email Address
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 dark:text-white placeholder:text-slate-400 transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Phone Number Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Phone Number
                                </label>
                                <div className="relative">
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        placeholder="Enter your phone number"
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 dark:text-white placeholder:text-slate-400 transition-all duration-300"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 dark:text-white placeholder:text-slate-400 transition-all duration-300"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    I am a
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            id="student"
                                            checked={input.role === "student"}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="student"
                                            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${input.role === "student"
                                                ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300'
                                                : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 text-slate-600 dark:text-slate-400'
                                                }`}
                                        >
                                            <User className="w-5 h-5" />
                                            <span className="font-medium">Student</span>
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            id="recruiter"
                                            checked={input.role === "recruiter"}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <label
                                            htmlFor="recruiter"
                                            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${input.role === "recruiter"
                                                ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300'
                                                : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 text-slate-600 dark:text-slate-400'
                                                }`}
                                        >
                                            <Users className="w-5 h-5" />
                                            <span className="font-medium">Recruiter</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Picture Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                    <Upload className="w-4 h-4" />
                                    Profile Picture
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="w-full px-4 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 dark:file:bg-purple-900/30 dark:file:text-purple-300 transition-all duration-300"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-bold text-lg rounded-xl shadow-lg transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <span>Sign Up</span>
                                )}
                            </button>

                            {/* Sign In Link */}
                            <div className="text-center pt-4">
                                <p className="text-slate-600 dark:text-slate-400">
                                    Already have an account?{' '}
                                    <Link to="/login">
                                        <span className="text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text font-semibold hover:from-purple-700 hover:to-pink-700 cursor-pointer transition-all duration-300">
                                            Sign In
                                        </span>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
                    <p>Secure registration with end-to-end encryption</p>
                </div>
            </div>
        </div>
    )
}

export default Signup
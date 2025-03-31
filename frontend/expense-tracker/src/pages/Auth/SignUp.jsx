import React, { useState, useContext } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext)

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = '';

    if (!fullName) {
      setError('Họ và tên không được để trống');
      return;
    }

    if (!validateEmail(email)) {
      setError('Email không hợp lệ');
      return;
    }

    if (!password) {
      setError('Mật khẩu không được để trống');
      return;
    }

    setError('');

    // Sign up api call
    try {
      // Upload image if present
      if (profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          fullName,
          email,
          password,
          profileImageUrl
        });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }

  }
  return (
    <AuthLayout>
      <div className='lb:w-[100% h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center' >
        <h3 className='text-xl font-semibold text-black'>Tạo tài khoản</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>Tham gia bằng cách cung cấp thông tin của bạn ở phía dưới</p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Họ và tên"
              placeholder="Nhập họ và tên"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email"
              placeholder="example@gmai.com"
              type="text"
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Mật khẩu"
                placeholder="Ít nhất 8 ký tự"
                type="password"
              />
            </div>
          </div>

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button type='submit' className='btn-primary'>
            Đăng ký
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
            Bạn đã có tài khoản chưa?{' '}
            <Link className='font-medium text-[#875cf5] underline' to='/login' >
              Đăng nhập
            </Link>

          </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp

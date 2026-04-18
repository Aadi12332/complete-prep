import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../Context/AuthContext';
import { userApi } from '../../../services/apiFunctions';

const ProfileTab = () => {
  const { user, setUser } = useContext(AuthContext);
  const [imagePreview, setImagePreview] = useState(user?.image || null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      linkedInUrl: '',
      email: '',
      image: null,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        mobileNumber: user.mobileNumber || '',
        linkedInUrl: user.linkedInUrl || '',
        email: user.email || '',
        image: null,
      });
      setImagePreview(user.image || null);
    }
  }, [user, reset]);

  const watchedImage = watch('image');

  useEffect(() => {
    if (watchedImage && watchedImage[0]) {
      const file = watchedImage[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }, [watchedImage]);

  const onSubmit = async data => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (data.image && data.image[0]) {
        formData.append('image', data.image[0]);
        userApi.settingPage.updateProfileImage({
          data: formData,
          onSuccess: res => {
            setUser({
              ...user,
              ...res?.data,
            });
            reset({
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              mobileNumber: user.mobileNumber || '',
              linkedInUrl: user.linkedInUrl || '',
              email: user.email || '',
              image: null,
            });
            setImagePreview(res?.data?.image || null);
          },
          onError: err => {
            console.error('Profile update failed', err);
          },
        });
      }

      userApi.settingPage.updateProfile({
        data: data,
        onSuccess: res => {
          setUser({
            ...user,
            ...res?.data,
          });
          reset({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            mobileNumber: user.mobileNumber || '',
            linkedInUrl: user.linkedInUrl || '',
            email: user.email || '',
            image: null,
          });
          setImagePreview(res?.data?.image || null);
        },
        onError: err => {
          console.error('Profile update failed', err);
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, icon, name, type, validation }) => (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>

      <div
        className={`flex items-center rounded-3xl px-3 py-2 border ${
          errors[name] ? 'border-red-500 bg-red-50' : 'bg-gray-100'
        }`}
      >
        <Icon icon={icon} className="mr-2 text-black" />
        <input
          type={type}
          {...register(name, validation)}
          className="bg-transparent w-full outline-none"
        />
      </div>

      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
    </div>
  );

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2">Profile</h2>
            <p className="text-gray-600 text-sm">
              Your personal information and account security settings.
            </p>
          </div>

          <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-2">Avatar</p>

              <div className="flex items-center gap-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                )}

                <label className="cursor-pointer bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold px-4 py-2 rounded-3xl">
                  Change
                  <input type="file" accept="image/*" {...register('image')} className="hidden" />
                </label>
              </div>
            </div>

            <div></div>

            <InputField
              label="First Name"
              icon="akar-icons:person"
              name="firstName"
              type="text"
              validation={{ required: 'First name is required' }}
            />

            <InputField
              label="Last Name"
              icon="akar-icons:person"
              name="lastName"
              type="text"
              validation={{ required: 'Last name is required' }}
            />

            <InputField
              label="Phone Number"
              icon="akar-icons:phone"
              name="mobileNumber"
              type="text"
              validation={{ required: 'Phone number is required' }}
            />

            <InputField
              label="LinkedIn"
              icon="akar-icons:link-chain"
              name="linkedInUrl"
              type="text"
              validation={{
                pattern: {
                  message: 'Enter valid LinkedIn URL',
                },
              }}
            />

            <InputField
              label="Email"
              icon="akar-icons:envelope"
              name="email"
              type="email"
              validation={{
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter valid email',
                },
              }}
            />

            {isDirty && (
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#3DD455] hover:bg-black text-black hover:!text-[#3DD455] font-bold rounded-3xl py-2 px-4"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileTab;

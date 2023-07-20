import { useState } from "react"
import Form from "../../shared/Form"
import { profileValidation } from "./validation"
import Input from "../../shared/Input"
import { Button } from "../../shared/Button"
import TextArea from "../../shared/TextArea"

const ProfileForm = () => {
  // const saveProfile = ({ ...value }) => {
  // }

  const [username, setUserName] = useState("")
  const [twitterHandle, setTwitterHandle] = useState("")
  const [location, setLocation] = useState("")
  const [askmeabout, setAskMeAbout] = useState("")
  const [bio, setBio] = useState("")

  return (
    <Form
      // onSubmit={async (values) => {
      //   saveProfile({ ...values })
      // }}
      validationSchema={profileValidation}
      className="w-full flex flex-col gap-y-[10px] md:gap-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-[10px] md:gap-x-[30px]">
        <div className="flex flex-col gap-[5px]">
          <p
            className="font-quicksand font-bold
          text-white 
          text-[16px] md:text-[20px]"
          >
            User Name:{" "}
          </p>
          <Input
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="outline-none h-[33px] w-[235px] rounded-md placeholder:text-[gray]"
            containerClassName="h-[33px] w-[235px]"
            placeholder="Username"
            hookToForm
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <p
            className="font-quicksand font-bold
            text-white 
            text-[16px] md:text-[20px]"
          >
            Twitter Handle:{" "}
          </p>
          <Input
            id="twitterhandle"
            name="twitterhandle"
            value={twitterHandle}
            onChange={(e) => setTwitterHandle(e.target.value)}
            className="outline-none h-[33px] w-[235px] rounded-md placeholder:text-[gray]"
            containerClassName="h-[33px] w-[235px]"
            placeholder="Twitter Handle"
            hookToForm
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[30px]">
        <div className="flex flex-col gap-[5px]">
          <p
            className="font-quicksand font-bold
            text-white 
            text-[16px] md:text-[20px]"
          >
            Location:{" "}
          </p>
          <Input
            id="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="outline-none h-[33px] w-[235px] rounded-md placeholder:text-[gray]"
            containerClassName="h-[33px] w-[235px]"
            placeholder="Location"
            hookToForm
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <p
            className="font-quicksand font-bold
            text-white 
            text-[16px] md:text-[20px]"
          >
            Ask Me About:{" "}
          </p>
          <Input
            id="askmeabout"
            name="askmeabout"
            value={askmeabout}
            onChange={(e) => setAskMeAbout(e.target.value)}
            className="outline-none h-[33px] w-[235px] rounded-md placeholder:text-[gray]"
            containerClassName="h-[33px] w-[235px]"
            placeholder="Ask Me About"
            hookToForm
          />
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="flex flex-col gap-[5px]">
          <p
            className="font-quicksand font-bold
            text-white 
            text-[16px] md:text-[20px]"
          >
            Bio:{" "}
          </p>
          <TextArea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="outline-none 
              h-[86px] 
              w-[235px] md:w-[500px]
              rounded-md placeholder:text-[gray]"
            placeholder="Bio"
            hookToForm
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <Button
          id="lets_begin_staking"
          className="!font-eigerdals !font-bold
                  !px-0 !py-0
                  w-[166px] 
                  h-[45px] md:h-[55px]
                  !text-[19px]"
          type="submit"
        >
          SAVE PROFILE
        </Button>
      </div>
    </Form>
  )
}

export default ProfileForm

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { BiImages } from "react-icons/bi";
import { useSelector } from "react-redux";
import { updateUser } from "../features/post/postActions";

function Settings() {
  const {token, id } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profession, setProfession] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  function onCloseModal() {
    setOpenModal(false);
  }

  async function onSave() {
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !profession ||
      !city ||
      !state
    ) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const userData = {
        name: `${firstName} ${lastName}`,
        phoneNumber: phoneNumber,
        profession: profession,
        city: city,
        state: state,
      };
      const updatedUser = await updateUser(token, userData);
      console.log("User updated:", updatedUser);
      setOpenModal(false);
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error
    }
  }

  return (
    <>
      <Button
        className="text-black rounded-full"
        onClick={() => setOpenModal(true)}
      >
        {" "}
        <IoMdSettings className="w-8 h-8 my-auto mx-2 " />
      </Button>
      <Modal
        show={openModal}
        size="md"
        className="py-auto"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="bg-white shadow-md rounded px-8 pt-2 pb-8 mb-4 flex flex-col">
            <label
              className="block uppercase tracking-wide text-grey-darker text-lg font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Edit Profile
            </label>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-first-name"
                >
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <p className="text-red text-xs italic">
                  Please fill out this field.
                </p>
              </div>
              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full  px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-phone-number"
                >
                  Phone Number
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="grid-phone-number"
                  type="text"
                  placeholder="1234567890"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="-mx-3 md:flex mb-6">
              <div className="md:w-full px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-profession"
                >
                  Profession
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
                  id="grid-profession"
                  type="text"
                  placeholder="Profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
                <p className="text-grey-dark text-xs italic">
                  Make it as long and as crazy as you'd like
                </p>
              </div>
            </div>
            <div className="-mx-3 md:flex mb-2">
              <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-city"
                >
                  City
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="grid-city"
                  type="text"
                  placeholder="Albuquerque"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                  htmlFor="grid-state"
                >
                  State
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  id="grid-state"
                  type="text"
                  placeholder="90210"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between py-4">
              <label
                className="flex items-center gap-1 text-base text-black cursor-pointer"
                htmlFor="imgUpload"
              >
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                  id="imgUpload"
                  data-max-size="5120"
                  accept=".jpg, .png, .jpeg"
                />
                <BiImages />
                <span>Profile Photo </span>
              </label>
            </div> */}
            <div className="flex flex-row justify-end">
              <Button className="bg-black text-white" onClick={onSave}>
                Save
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Settings;
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { findUsers } from "../features/post/postActions";
import {useSelector} from 'react-redux';

function List(props) {
  const [openModal, setOpenModal] = useState(false);
  // const [email, setEmail] = useState("");
  const [list, setList] = useState();
  const {token} = useSelector((store)=>store.user);

  function onCloseModal() {
    setOpenModal(false);
    // setEmail("");
  }
  const name = props.name;
  const data = props.data;
  const handleClick = async()=>{
    setOpenModal(true)
    const res = await findUsers(token, data);
    setList(res);

  }
  return (
    <>
      <Button
        className="text-white  rounded-full" 
        // className="none"
        onClick={handleClick}
        // onClick={() => setOpenModal(true)}
      > 
        <span className="text-md hover:text-rose-700">Search</span>
        {/* <IoMdList className="w-8 h-8 my-auto mx-2 " /> */}
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
          <div className="flex flex-col ">
            <div className="px-10 overflow-hidden">
              <div className=" text-blue-200 overflow-y-auto text-lg ">
                {list ? list?.map(({_id, name, image, profession }) => {
                  return (
                    <Link
                      to={`/profile/${_id}`}
                      onClick={onCloseModal}
                      key={_id}
                    >
                      <div
                        className="flex  items-center py-3 border-b border-b-gray-300"
                        key={_id}
                      >
                        <div className="cursor-pointer flex items-center ">
                          <div className="rounded-full ">
                            <img
                              src={image}
                              className="h-20 w-20 rounded-full object-cover"
                            />{" "}
                          </div>

                          <div className="ml-6">
                            <h3 className="text-xl font-semibold text-black">
                              {name}{" "}
                            </h3>
                            <p className="text-sm font-light text-green-600">
                              {profession}{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                }): <h2>No Records</h2>}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default List;

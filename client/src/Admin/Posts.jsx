import { useState, useEffect } from "react";
import Details from "./Details";
import Axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  Input,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

// Define the table head for posts
const POSTS_TABLE_HEAD = [
  "Food Type",
  "Username",
  "Created Time",
  "status",
  "Action",
];

const Posts = () => {
  const [postsTableRows, setPostsTableRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const openModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/sortdonation?page=1`)
      .then((response) => {
        setTotalItems(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:5000/sortdonation?page=${currentPage}`)
      .then((response) => {
        setPostsTableRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage, itemsPerPage]);

  const handleDelete = (donation_id) => {
    Axios.put(`http://localhost:5000/deletedonation/${donation_id}`)
      .then((response) => {
        console.log(`Deleting donation with id ${donation_id}`);
      })
      .catch((error) => {});
  };

  const filteredRows = postsTableRows.filter((row) => {
    const type = row["type"];
    const username = row["username"];
    const status = row["status"];

    return (
      (type &&
        type.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (username &&
        username.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (status &&
        status.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-white w-[300px] border border-blue ml-[20%] "
      />

      <Card className="h-full  mt-8 ml-[20%] w-[80%] ">
        <CardBody className="px-0">
          <table className="w-full min-w-max table-auto text-center">
            <thead>
              <tr>
                {POSTS_TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue"
                      className="text-md leading-none opacity-70 font-bold text-blue"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(
                (
                  { type, username, role_id, date, donation_id, status },
                  index
                ) => {
                  const isEvenRow = index % 2 === 0;
                  const classes = isEvenRow
                    ? "p-4 bg-blue-gray-50"
                    : "p-4 bg-white border-b border-blue-gray-50";

                  return (
                    <tr key={donation_id} className={classes}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {type}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                          >
                            {username}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {role_id}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {status}
                        </Typography>
                      </td>

                      <td className={classes}>
                        <Button
                          color="blue"
                          className="bg-blue"
                          onClick={() => openModal(donation_id)}
                        >
                          Show Details
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        {isModalOpen && (
          <Details
            showModal={isModalOpen}
            onClose={closeModal}
            id={selectedPost}
          />
        )}
      </Card>

      {/* Pagination controls */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
          className="bg-blue hover:bg-blue-600 text-white mr-4 cursor-pointer px-4 py-2 rounded focus:outline-none"
        >
          Previous
        </button>
        <span className="mr-4 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="ml-4 bg-blue hover:bg-blue-600 text-white cursor-pointer px-4 py-2 rounded focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Posts;

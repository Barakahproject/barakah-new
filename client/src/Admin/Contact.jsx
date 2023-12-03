import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";

// Define the table head
const TABLE_HEAD = ["Subject", "User", "Email", "Message", "Sent at", "Action"];

const ContactTable = () => {
  // State to store table rows, search term, and pagination
  const [tableRows, setTableRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    // Make an Axios request to your API endpoint with pagination parameters
    Axios.get("http://localhost:5000/countallcontacts")
      .then((response) => {
        // Assuming the API response has a data property that contains the rows
        setTotalItems(response.data[0].count);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Fetch data from API when component mounts or when pagination changes
  useEffect(() => {
    // Make an Axios request to your API endpoint with pagination parameters
    Axios.get(`http://localhost:5000/getcontact`, {})
      .then((response) => {
        // Assuming the API response has a data property that contains the rows
        setTableRows(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage, itemsPerPage]); // The effect runs when currentPage or itemsPerPage changes

  // Handle delete button click
  const handleDelete = (contact_id) => {
    // Add your delete logic here
    Axios.put(`http://localhost:5000/deletecontact/${contact_id}`)
      .then((response) => {
        console.log(`Deleting contact with id ${contact_id}`);
      })
      .catch((error) => {});
  };

  // Filter the table rows based on the search term
  const filteredRows = tableRows.filter((row) => {
    // Only search in the 'subject', 'username', and 'email' fields
    const subject = row["subject"];
    const username = row["username"];
    const email = row["email"];

    return (
      (subject &&
        subject.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (username &&
        username.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      (email &&
        email.toString().toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Calculate pagination info
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div>
      {/* Add the search input field */}
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-white w-[300px] border border-blue ml-[20%] "
      />

      <Card className="h-full w-[80%] mt-8 ml-[20%]  bg-blue-gray-50/50 ">
        <CardBody className="px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left ">
            <thead className="bg-white">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className=" bg-blue-gray p-4">
                    <Typography className="text-md leading-none font-semibold text-blue">
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(
                (
                  { subject, name, email, message, submitted_at, contact_id },
                  index
                ) => {
                  const isEvenRow = index % 2 === 0;
                  const classes = isEvenRow
                    ? "p-4 bg-blue-gray-50"
                    : "p-4 bg-white border-b border-blue-gray-50";

                  return (
                    <tr key={contact_id} className={classes}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {subject}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {email}
                        </Typography>
                      </td>
                      <td>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {message}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {submitted_at}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete Contact">
                          <IconButton
                            variant="text"
                            onClick={() => handleDelete(contact_id)}
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
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
            setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages + 1))
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

export default ContactTable;

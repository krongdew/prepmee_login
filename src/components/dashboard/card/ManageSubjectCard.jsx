"use client";
import { Tooltip } from "react-tooltip";

export default function ManageSubjectCard({ subject, onEdit }) {
  // ฟังก์ชันสำหรับการกดปุ่มลบ
  const handleDelete = () => {
    // สร้างและส่ง event พร้อมกับ ID ของรายวิชาที่ต้องการลบ
    const deleteEvent = new CustomEvent('delete-subject', {
      detail: { id: subject.id }
    });
    document.dispatchEvent(deleteEvent);
  };

  return (
    <>
      <tr>
        <th scope="row">
          <div className="freelancer-style1 box-shadow-none row m-0 p-0 align-items-lg-end">
            <div className="d-lg-flex px-0">
              <div className="details mb15-md-md">
                <h5 className="title mb10">{subject.name}</h5>
                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-place fz16 vam text-thm2 me-1" />{" "}
                  {subject.location}
                </p>
                <p className="mb-0 fz14 list-inline-item mb5-sm pe-1">
                  <i className="flaticon-30-days fz16 vam text-thm2 me-1 bdrl1 pl15 pl0-xs bdrn-xs" />{" "}
                  {subject.duration}
                </p>
              </div>
            </div>
          </div>
        </th>
        <td className="vam">
          <span className="fz15 fw400">{subject.mode}</span>
        </td>
        <td className="vam">
          <span className="fz14 fw400">{subject.rate}</span>
        </td>
        <td>
          <div className="d-flex">
            <a
              className="icon me-2"
              id={`edit-${subject.id}`}
              data-bs-toggle="modal"
              data-bs-target="#proposalModal"
              onClick={(e) => {
                e.preventDefault();
                onEdit(subject);
              }}
            >
              <Tooltip anchorSelect={`#edit-${subject.id}`} className="ui-tooltip" place="top">
                Edit
              </Tooltip>
              <span className="flaticon-pencil" />
            </a>
            <a
              className="icon"
              id={`delete-${subject.id}`}
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
            >
              <Tooltip
                anchorSelect={`#delete-${subject.id}`}
                place="top"
                className="ui-tooltip"
              >
                Delete
              </Tooltip>
              <span className="flaticon-delete" />
            </a>
          </div>
        </td>
      </tr>
    </>
  );
}
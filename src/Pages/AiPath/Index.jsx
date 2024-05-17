import * as React from "react";
import "./Style.css";
import Layout from "../../Components/Layout/Layout";
import SearchAiPath from "../../Components/AiPath/SearchAiPath/Index";
import AllAiPaths from "../../Components/AiPath/AllAiPaths/Index";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import { APIUrlOne, APIUrlTwo } from "../../Utils/Utils";
export default function AIPath() {
  const [Fromalldata, setFromalldata] = React.useState("")
  const [ResponseData, setResponseData] = React.useState(null)
  const [ResponseDatanew, setResponseDatanew] = React.useState(null)
  const [Toinput, setToinput] = React.useState("")
  const [targetuid, settargetuid] = React.useState(null)
  const [sourceuid, setsourceuid] = React.useState(null);
  const [dataShortestPath, setDataShortestPath] = React.useState("");
  const [showAutocomplete, setShowAutocomplete] = React.useState(false);
  const [showAutocompletenew, setShowAutocompletenew] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handlesearch = () => {
    setLoading(true)
    const data = {
      people_name: Fromalldata
    };
    axios.post(`${APIUrlOne()}/v1/people_search`, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setLoading(false)
        if (response.status === 200) {
          setResponseData(response.data);
          toast.success(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message);
      });
  };
  const handlesearchnew = () => {
    setLoading(true)
    const data = {
      people_name: Toinput
    };
    axios.post(`${APIUrlOne()}/v1/people_search`, data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        setLoading(false)
        if (response.status === 200) {
          setResponseDatanew(response.data);
          toast.success(response.data.message);
        }
      })
      .catch(error => {
        setLoading(false)
        toast.error(error.response.data.message);
      });
  };
  const handelselectdata = (item) => {
    setShowAutocomplete(true)
    const people_name = `${item.first_name ? item.first_name  : ''} ${item.last_name ? item.last_name : ''}${item.primary_job_title ? ', '+item.primary_job_title  : ''}${item.primary_organization ? ', '+item.primary_organization + ' ' : ''}`; const id = `${item.id}`
    setsourceuid(id)
    setResponseData()
    setFromalldata(people_name);
    setShowAutocomplete(false)
  };
  const handelselectdatanew = (item) => {
    setShowAutocompletenew(true)
    const people_name = `${item.first_name ? item.first_name  : ''} ${item.last_name ? item.last_name  : ''}${item.primary_job_title ? ', '+item.primary_job_title : ''}${item.primary_organization ? ', '+item.primary_organization + ' ' : ''}`; const id = `${item.id}`
    settargetuid(id)
    setResponseDatanew()
    setToinput(people_name);
    setShowAutocompletenew(false)
  };
  const validation = () => {
    if (Fromalldata === "") {
      toast.error("Please Select From")
      return false
    }
    if (Toinput === "") {
      toast.error("Please Select to")
      return false
    }
    return true
  }
  const handleRightsidebar = () => {
    if (!validation()) return
    setLoading(true)
    const data = {};
    data.source_uid = Number(sourceuid)
    data.target_uid = Number(targetuid)
    const option = {
      method: "POST",
      headers: {
        "access-control-allow-origin": "*",
        "content-type": "application/json",
      },
      data: data,
      url: `${APIUrlTwo()}/v1/shortest-path`,
    };
    axios(option)
      .then((response) => {
        setLoading(false);
        if (response?.status === 200) {
          setFromalldata("")
          setToinput("")
          const data = Object.values(response?.data)
          setDataShortestPath(data);
        }
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err?.response?.data?.message);
      });
  };
  React.useEffect(() => {
    let timer
    if (Toinput.length > 2) {
      timer = setTimeout(() => {
        handlesearchnew();
      }, 1000);
    }
    return () => clearTimeout(timer)
  }, [Toinput]);
  React.useEffect(() => {
    let timer
    if (Fromalldata.length > 2) {
      timer = setTimeout(() => {
        handlesearch();
      }, 1000);
    }
    return () => clearTimeout(timer)
  }, [Fromalldata]);
  return (
    <>
      <Layout>
        {loading ? <Loader /> : null}
        <div className="child-section-of-everypage-aipath">
          <div>
            <SearchAiPath
              setShowAutocomplete={setShowAutocomplete}
              showAutocompletenew={showAutocompletenew}
              setShowAutocompletenew={setShowAutocompletenew}
              showAutocomplete={showAutocomplete}
              handelselectdata={handelselectdata}
              Fromalldata={Fromalldata}
              setFromalldata={setFromalldata}
              handlesearch={handlesearch}
              ResponseData={ResponseData}
              setResponseData={setResponseData}
              Toinput={Toinput}
              setToinput={setToinput}
              handelselectdatanew={handelselectdatanew}
              handlesearchnew={handlesearchnew}
              handleRightsidebar={handleRightsidebar}
              ResponseDatanew={ResponseDatanew}
              setsourceuid={setsourceuid}
            />
          </div>
          <div>
            <AllAiPaths dataShortestPath={dataShortestPath} />
          </div>
        </div>
      </Layout>
    </>
  );
}
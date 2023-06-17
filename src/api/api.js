/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-empty-function */
// @ts-nocheck
import axios from "axios";
// const API_URL = "http://172.16.23.50:8050/api";
const API_URL = "http://172.17.139.8:8080/api";
const FMURL = "http://172.17.139.3:8080";
// const FMURL = "http://172.16.23.50:8080";

export const SIGNIN = ({ username, password, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "/Account/SignIn",
    data: {
      username: username,
      password: password,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result
        ? onSuccess
          ? onSuccess(response.data.result)
          : () => { }
        : onFail
          ? onFail(response.data)
          : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const SIGNUP = ({
  username,
  password,
  firstName,
  lastName,
  nationalCode,
  role,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/Account/SignUp",
    data: {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      nationalCode: nationalCode,
      role: role,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};



export const CHANGE_PASSWORD = ({
  userId,
  token,
  previousPassword,
  newPassword,
  confirmPassword,
  onSuccess,
  onFail,
})=>{
  const options = {
    method: "POST",
    url: API_URL + "/Account/ChangePassword",
    headers: { token: token },
    data: {
      userId: userId,
      previousPassword: previousPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.succeeded
      ? onSuccess
        ? onSuccess(response.data)
        : () => { }:
        onFail ? onFail(response.errors) : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });

}

////////////////////////////// SHEETs //////////////////////////////

export const GET_SHEETS = ({
  token,
  setArray,
  onSuccess,
  onFail,
  signOut,
}) => {
  const options = {
    method: "GET",
    url: API_URL + "/DocTitle/GetAll",
    headers: { token: token },
  };
  console.log(options);
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      if (response.data != "Can't authenticate user!") {
        onSuccess != "" ? onSuccess(response.data.result) : {};
        setArray(response.data.result);
        console.log(response);
        return response.data.result;
      } else {
        signOut();
      }
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const CREATE_SHEET = ({ content, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "/DocTitle/Create",
    data: {
      content: content,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const UPDATE_SHEET = ({ id, content, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "/DocTitle/Update",
    data: {
      id: id,
      content: content,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const DELETE_SHEET = ({ id, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "/DocTitle/DeleteById",
    data: {
      id: id,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

////////////////////////////// Title //////////////////////////////

export const GET_TITLES = ({
  ParentID,
  token,
  onSuccess,
  onFail,
  setArray,
}) => {
  const options = {
    method: "GET",
    url: API_URL + "/Title/GetByParentId",
    headers: { token: token },
    params: { parentId: ParentID },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      if (response.data != "Can't authenticate user!") {
        onSuccess != "" ? onSuccess(response.data.result) : {};
        setArray(response.data.result);
        // console.log(response);
        return response.data.result;
      }
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const CREATE_TITLE = ({
  content,
  docTitleID,
  token,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/Title/Create",
    data: {
      content: content,
      docTitleID: docTitleID,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const UPDATE_TITLE = ({
  id,
  content,
  token,
  docTitleId,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/Title/Update",
    data: {
      id: id,
      content: content,
      docTitleId: docTitleId
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const DELETE_TITLE = ({ id, token, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "/Title/DeleteById",
    data: {
      id: id,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

////////////////////////////// SubTitles //////////////////////////////

export const GET_SUBTITLES = ({
  ParentID,
  token,
  onSuccess,
  onFail,
  setArray,
}) => {
  const options = {
    method: "GET",
    url: API_URL + "/Subtitle/GetByParentId",
    headers: { token: token },
    params: { parentId: ParentID },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      if (response.data != "Can't authenticate user!") {
        onSuccess != "" ? onSuccess(response.data.result) : {};
        setArray(response.data.result);
        // console.log(response.data);
        return response.data.result;
      }
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const CREATE_SUBTITLE = ({
  content,
  titleID,
  token,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/Subtitle/Create",
    data: {
      content: content,
      titleID: titleID,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const UPDATE_SUBTITLE = ({
  id,
  content,
  token,
  titleId,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/Subtitle/Update",
    data: {
      id: id,
      content: content,
      titleId: titleId
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const DELETE_SUBTITLE = ({ id, content, titleId, token, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "/Subtitle/Delete",
    data: {
      id: id,
      content: content,
      titleId: titleId
    },
    headers: { token: token },
  };

  console.log(options);

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

////////////////////////////// Questons //////////////////////////////

export const GET_QUESTIONS = ({
  ParentID,
  token,
  onSuccess,
  onFail,
  setArray,
}) => {
  const options = {
    method: "GET",
    url: API_URL + "/Question/GetByParentId",
    headers: { token: token },
    params: { parentId: ParentID },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      if (response.data != "Can't authenticate user!") {
        onSuccess != "" ? onSuccess(response.data.result) : {};
        setArray(response.data.result);
        // console.log(response);
        return response.data.result;
      }
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const CREATE_QUESTION = ({
  content,
  subtitleID,
  token,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/Question/Create",
    data: {
      content: content,
      subtitleId: subtitleID,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const UPDATE_QUESTION = ({
  id,
  content,
  subtitleId,
  token,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/Question/Update",
    data: {
      id: id,
      content: content,
      subtitleId: subtitleId,
    },
    headers: { token: token },
  };

  console.log(options);

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const DELETE_QUESTION = ({ id, subtitleId, content, token, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "/Question/Delete",
    data: {
      id: id,
      subtitleId: subtitleId,
      content: content,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

////////////////////////////// Answers //////////////////////////////

export const GET_ANSWERS_BY_QUESTION_AND_USER = ({
  questionId,
  userId,
  token,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "GET",
    url: API_URL + "/QuestionAsnwer/GetByUserAndQuestionId",
    headers: { token: token },
    params: { questionId: questionId, userId: userId },
  };

  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      response.data != "Can't authenticate user!" && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const CREATE_ANSWER = ({
  answer,
  questionId,
  userId,
  token,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/QuestionAsnwer/Create",
    data: {
      answer: answer,
      questionId: questionId,
      userId: userId,
      token,
    },
    headers: { token: token },
  };
  console.log(options);

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const UPDATE_ANSWER = ({
  id,
  answer,
  token,
  questionId,
  userId,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/QuestionAsnwer/Update",
    data: {
      id: id,
      answer: answer,
      questionId: questionId,
      userId: userId,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const DELETE_ANSWER = ({ id, token, onSuccess, onFail }) => {
  const options = {
    method: "POST",
    url: API_URL + "/QuestionAsnwer/DeleteById",
    data: {
      id: id,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

////////////////////////////// Related Files //////////////////////////////

export const GET_RELATED_FILES = ({
  docTitleID,
  token,
  onSuccess,
  onFail,
  setArray,
}) => {
  const options = {
    method: "GET",
    url: API_URL + "/RelatedFile/GetByParentId",
    headers: { token: token },
    params: { parentId: docTitleID },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data != "Can't authenticate user!" && onSuccess
        ? onSuccess(response.data)
        : () => {
        };
      setArray(response.data.result);
      return response.data;
    })
    .catch(function (error) {
      onFail ? onFail(error) : () => { };
      console.error(error);
    });
};

export const CREATE_RELATED_FILE = ({
  fileName,
  docTitleId,
  token,
  description,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/RelatedFile/Create",
    data: {
      fileName: fileName,
      docTitleId: docTitleId,
      description: description,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      onFail ? onFail(error) : () => { };
    });
};

export const UPDATE_RELATED_FILE = ({
  id,
  fileName,
  token,
  description,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/RelatedFile/Update",
    data: {
      id: id,
      fileName: fileName,
      description: description,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      onFail ? onFail(error) : () => { };
    });
};

export const DELETE_RELATED_FILE = ({
  id,
  token,
  onSuccess,
  onFail,
}) => {
  const options = {
    method: "POST",
    url: API_URL + "/RelatedFile/DeleteById",
    data: {
      id: id,
    },
    headers: { token: token },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      response.data.result && onSuccess
        ? onSuccess(response.data)
        : () => { };
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      onFail ? onFail(error) : () => { };
    });
};

// file manager api
export function DownloadFile({
  token,
  fileName,
  mimeType,
  fileTitle,
  onSuccess,
  onFail,
}) {
  const options = {
    method: "GET",
    url: FMURL + "/api/File/Download",
    params: { fileName: String(fileName) },
    responseType: "blob",
    headers: {
      token: token,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response);
      onSuccess != null ? onSuccess() : {};
      const href = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = href;
      const FN = fileTitle + "." + mimeType;
      link.setAttribute("download", String(FN));
      document.body.appendChild(link);
      link.click();
      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      onFail != null ? onFail() : {};
      return error;
    });
}

export function GetFilesBytFileName({
  token,
  fileName,
  signOut,
  onSuccess,
  onFail,
}) {
  const options = {
    method: "GET",
    url: FMURL + "/api/File/GetByName",
    params: { name: fileName },
    headers: {
      token: token,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      if (response.data.result == null) {
        signOut();
        return response.data;
      } else {
        onSuccess != null ? onSuccess(response.data.result) : {};
        return response.data.result;
      }
    })
    .catch(function (error) {
      console.error(error);
      onFail != null ? onFail() : {};
      return error;
    });
}

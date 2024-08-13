import { useState, useEffect } from "react";
// import { timeZoneList } from "../constants/TimeZone";

import { jwtDecode } from "jwt-decode";

const CommonUtil = {
  isValidEmail(email) {
    if (email === undefined || email === "") return true;
    //const regex = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regex1 = /^[a-zA-Z0-9-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,4}$/;
    const regex2 = /^[a-zA-Z]+(\.[a-zA-Z]+)?@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
    const regex3 = /^[a-zA-Z]\w*@[a-zA-Z]+\.[a-zA-Z]{2,4}$/;
    const regex4 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
    const regex5 =
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}\.[a-zA-Z]{2,4}$/;

    if (
      regex1.test(email.toLowerCase()) ||
      regex2.test(email.toLowerCase()) ||
      regex3.test(email.toLowerCase()) ||
      regex4.test(email.toLowerCase()) ||
      regex5.test(email.toLowerCase())
    ) {
      return true;
    }
    return false;
  },
  isValidMobile(mobile) {
    if (mobile === undefined || mobile === "") return true;
    const re = /^(\+\d{1,3}[- ]?)?\d{8,15}$/;
    return re.test(String(mobile));
  },

  isExceptNumericName(name) {
    if (name === undefined || name === "") return true;
    let finalString = name.replace(/[^\d.-]/g, "");
    return finalString;
  },

  isValidResolution(data) {
    if (data === undefined || data === "") return true;
    const regex = /^\d{1,3}[*]\d{1,3}$/;
    return regex.test(data);
  },

  isValidName(name) {
    if (name === undefined || name === "") return true;
    let regex = /^[a-zA-Z0-9]+[\'\s]?[a-zA-Z0-9 ]+$/;
    return regex.test(name);
  },
  isAlphaNumeric(data) {
    if (data === undefined || data === "") return true;
    let regex = /^[a-zA-Z0-9]+$/i;
    return regex.test(data);
  },

  isValidNumericName(name) {
    if (name === undefined || name === "") return true;
    let regex = /^[A-Za-z0-9 ]+$/;
    return regex.test(name);
  },

  isValidNumeric(name) {
    if (name === undefined || name === "") return true;
    let regex = /^[0-9]*\.?[0-9]*$/;
    return regex.test(name);
  },


  isValidPercentage(name) {
    if (name === undefined || name === "") return true;
    let regex = /^(\d{1,3}(\.\d{1,2})?)$/;
    if (regex.test(name)) {
      let percentage = parseFloat(name);
      return percentage <= 100;
    }
    return false;
  },

  isValidNumericWithSingleDot(name) {
    if (name === undefined || name === "") return true;
    let regex = /^[0-9]+(\.[0-9]+)?$/;
    return regex.test(name);
  },

  isValidPasitiveNumeric(name) {
    if (name === undefined || name === "") return true;
    let regex = /^[0-9]+$/;
    return regex.test(name);
  },
  isValidDoubleValue(value) {
    if (value === undefined || value === "") return true;
    let regex = /^[+-]?([1-9][0-9]*|0)(\.[0-9]+)?((e|E)[+-]?[0-9]+)?$/;
    return regex.test(value);
  },

  isValidCode(code) {
    if (code === undefined || code === "") return true;
    let regex = /^[a-zA-Z0-9]*$/;
    return regex.test(code);
  },
  isValidZipcode(areaCode) {
    if (
      areaCode.length < 5 ||
      areaCode.length > 6 ||
      !areaCode.match(/^[0-9 ]+$/)
    )
      return true;
  },
  isAlphaNumericSlash(code) {
    if (code === undefined || code === "") return true;
    let regex = /^(?:[A-Za-z0-9]+)(?:[A-Za-z0-9 _]*)$/;
    return regex.test(code);
  },

  isEmptyString(val) {
    if (val === null || val === undefined || val === "") return true;
    else return false;
  },
  isAlphaNumericSpace(data) {
    if (data === undefined || data === "") return true;
    let regex = /^[a-zA-Z0-9_ ]+$/i;
    return regex.test(data);
  },
  isAlphaNumericChAndThSpace(data) {
    if (data === undefined || data === "") return true;
    //Support for Chinese and Thai
    let regex = /^[A-Za-z0-9_\s\u4e00-\u9fa5\u0E00-\u0E7F]*$/;
    return regex.test(data);
  },
  isAlphaNumericSpaceDot(data) {
    if (data === undefined || data === "") return true;
    let regex = /^[a-zA-Z0-9._ ]+$/i;
    return regex.test(data);
  },
  isAlphaNumericSpecialChar(data) {
    if (data === undefined || data === "") return true;
    let regex = /^[ A-Za-z0-9_@./#&+-]*$/;
    return regex.test(data);
  },
  isAlphaNumericUnderscore(data) {
    if (data === undefined || data === "") return true;
    let regex = /^[A-Za-z0-9_]*$/;
    return regex.test(data);
  },
  formatDayAndMonth(numValue) {
    if (numValue <= 0) {
      return "-" + (numValue + 12);
    }
    if (numValue < 10) {
      return "-0" + numValue;
    } else {
      return "-" + numValue;
    }
  },

  isEmpty(obj) {
    if (obj === null || obj === undefined) return true;
    return Object.keys(obj).length === 0;
  },
  getCompany() {
    return localStorage ? localStorage.getItem("companyId") : null;
  },

  getLocalDate(date) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let newDate = new Date(date);
    let formated =
      newDate.getDate() +
      "-" +
      monthNames[newDate.getMonth()].substring(0, 3) +
      "-" +
      newDate.getFullYear() +
      ", " +
      (newDate.getHours() < 10
        ? "0" + newDate.getHours()
        : newDate.getHours()) +
      ":" +
      (newDate.getMinutes() < 10
        ? "0" + newDate.getMinutes()
        : newDate.getMinutes()) +
      ":" +
      (newDate.getSeconds() < 10
        ? "0" + newDate.getSeconds()
        : newDate.getSeconds());
    return formated;
  },

  getFormatedDate(date) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let newDate = new Date(date);
    let formated =
      newDate.getDate() +
      ", " +
      monthNames[newDate.getMonth()] +
      " " +
      newDate.getFullYear();
    return formated;
  },

  handleTextOverflow(text, length) {
    let maxLength = 20;
    if (length) {
      maxLength = length;
    }
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  },

  getLocalDate1(date) {
    let newDate = new Date(date);
    return newDate
      .toISOString()
      .replace("T", " ")
      .substr(0, newDate.toISOString().lastIndexOf(":"));
  },

  getLocalTime(time) {
    let newTime = new Date(parseInt(time));
    return newTime.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  },

  sentenceCase(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },
  getDefaultCountryCode() {
    let countryCode = "";
    if (localStorage.getItem("locationInfo")) {
      countryCode = JSON.parse(
        localStorage.getItem("locationInfo")
      ).country_code.toLowerCase();
    }
    return countryCode;
  },
  getDefaultCallingCountryCode() {
    let countryCallingCode = "";
    if (localStorage.getItem("locationInfo")) {
      countryCallingCode = JSON.parse(
        localStorage.getItem("locationInfo")
      ).country_calling_code.toLowerCase();
    }
    return countryCallingCode;
  },
  isValidPassword(password) {
    if (password === undefined || password === "") return true;
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{8,}$/;
    return re.test(String(password));
  },

  formatLongText(text) {
    if (text && text.length > 20) {
      return text.substr(0, 19) + "...";
    } else {
      return text;
    }
  },
  getLocationDetails(query) {
    let res = "";
    if (localStorage.getItem("locationInfo")) {
      let location = JSON.parse(localStorage.getItem("locationInfo"));
      switch (query) {
        case "ip": {
          res = location.ip;
          break;
        }
        case "latitude": {
          res = location.latitude;
          break;
        }
        case "longitude": {
          res = location.longitude;
          break;
        }
        case "country_code": {
          res = location.country_code;
          break;
        }
        case "country_name": {
          res = location.country_name;
          break;
        }
        case "country_calling_code": {
          res = location.country_calling_code;
          break;
        }
      }
    }
    return res;
  },
  setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    let domain = window?.location?.host?.replace("level", "");
    document.cookie =
      cname + "=" + cvalue + ";" + expires + `;domain=${domain};path=/`;
  },
  getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },

  getFormatedDateString(date) {
    let today = new Date(date);
    let fdate =
      (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) +
      "-" +
      (today.getMonth() + 1 < 10
        ? "0" + (today.getMonth() + 1)
        : today.getMonth() + 1) +
      "-" +
      today.getFullYear();
    return fdate;
  },

  resetUserSession() {
    localStorage.removeItem("USER_TOKEN");
    localStorage.removeItem("REFRESH_TOKEN");
    localStorage.removeItem("selectedClient");
    localStorage.removeItem("selectedClientId");
    localStorage.removeItem("RETAIL_CLIENT");
    localStorage.removeItem("ROLE_NAME");
    localStorage.removeItem("USER");
    localStorage.removeItem("screenResolution");
    localStorage.removeItem("permission");
    localStorage.removeItem("payload");
    localStorage.removeItem("model");
    localStorage.removeItem("screenOrientation");
    localStorage.removeItem("newFields");
    localStorage.removeItem("sidebarItemslist");
    localStorage.removeItem("templateId");
    localStorage.removeItem("type");
    localStorage.removeItem("display");
    CommonUtil.setCookie("USER_TOKEN", "", 0);
    CommonUtil.setCookie("REFRESH_TOKEN", "", 0);
    CommonUtil.setCookie("redirect_url", "", 0);
  },

//   getTimeZoneNameByValue(timeZone) {
//     return timeZoneList.find((t) => t.value === timeZone)?.name;
//   },
//   getTimeZoneByValue(timeZone) {
//     return timeZoneList.find((t) => t.value === timeZone);
//   },
  GetWindowDimenssion() {
    const [size, setSize] = useState({
      width: window.innerWidth + "px",
      height: window.innerHeight + "px",
    });
    const updateSize = () =>
      setSize({
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
      });
    useEffect(() => (window.onresize = updateSize), [size]);
    return size;
  },
  capitalizeFirst(str) {
    return typeof str === "string"
      ? str.charAt(0).toUpperCase() + str.slice(1)
      : str;
  },

  decodeToken() {
    const jwtToken = localStorage.getItem("authToken");
    let decoded_jwtToken = {};
    if (jwtToken) {
      try {
        decoded_jwtToken = jwtDecode(jwtToken);
      } catch { }
      localStorage.removeItem("USER");
      localStorage.setItem("USER", JSON.stringify(decoded_jwtToken));
    }
    return decoded_jwtToken;
  },
  getPageNumber(int) {
    if (int === 0) {
      return 1;
    } else {
      return int + 1;
    }
  },

  getLoginType() {
    let loginType = null;
    let user = CommonUtil.decodeToken();
    if (user) {
      if (user?.companyType === "CUSTOMER") {
        loginType = "RETAILCLIENT";
      } else if (
        user?.roleCode === "OWNER" &&
        user?.companyType !== "PRINCIPAL"
      ) {
        loginType = "HQ";
      }
      else if (user?.roleCode === "SUPERADMIN") {
        return "OWNER"
      } else {
        loginType = "PRINCIPAL";
      }
    }
    return loginType;
  },
};

export default CommonUtil;

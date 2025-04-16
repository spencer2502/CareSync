import streamlit as st
import requests
import json

st.set_page_config(page_title="CareSync Audit Logs", layout="wide")
st.title("🧾 CareSync Blockchain Audit Logs")

try:
    res = requests.get("http://localhost:4000/api/audit/logs")
    data = res.json()

    if len(data) == 0:
        st.warning("No audit logs found.")
    else:
        st.success(f"Found {len(data)} logs")
        for log in data:
            st.write({
                "Time": log["time"],
                "User Type": log["userType"],
                "User ID": log["userId"],
                "Record ID": log["recordId"],
                "Action": log["action"]
            })

except Exception as e:
    st.error("Failed to fetch logs.")
    st.exception(e)

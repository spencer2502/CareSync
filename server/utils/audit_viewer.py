import streamlit as st
import requests
import pandas as pd

st.set_page_config(page_title="CareSync Audit Logs", layout="wide")
st.title("🧾 CareSync Blockchain Audit Logs")

try:
    res = requests.get("http://localhost:4000/api/audit/logs")
    data = res.json()

    if not data:
        st.warning("No audit logs found.")
    else:
        st.success(f"✅ Found {len(data)} audit logs")

        # Create DataFrame with clean column names
        df = pd.DataFrame(data) 
        df.rename(columns={
            "time": "time",
            "userType": "user_type",
            "userId": "user_id",
            "recordId": "record_id",
            "action": "action"
        }, inplace=True)

        # Sidebar filters
        with st.sidebar:
            st.header("🔍 Filters")
            user_types = df["user_type"].unique().tolist()
            selected_user_type = st.multiselect("Filter by User Type", user_types, default=user_types)

            actions = df["action"].unique().tolist()
            selected_action = st.multiselect("Filter by Action", actions, default=actions)

        # Apply filters
        filtered_df = df[
            df["user_type"].isin(selected_user_type) &
            df["action"].isin(selected_action)
        ].reset_index(drop=True)

        # Display DataFrame with nice headers (with emojis)
        display_df = filtered_df.rename(columns={
            "time": "🕒 Time",
            "user_type": "👤 User Type",
            "user_id": "🆔 User ID",
            "record_id": "📄 Record ID",
            "action": "🛠️ Action"
        })

        st.dataframe(display_df.style.hide(axis="index"), use_container_width=True)

        # Expandable Log Cards
        st.markdown("---")
        st.subheader("📜 Detailed Logs")

        for idx, log in enumerate(filtered_df.to_dict(orient="records"), start=1):
            with st.expander(f"Log {idx}: {log['action']} by {log['user_type']}"):
                st.markdown(f"""
                **🕒 Time:** {log['time']}  
                **👤 User Type:** `{log['user_type']}`  
                **🆔 User ID:** `{log['user_id']}`  
                **📄 Record ID:** `{log['record_id']}`  
                **🛠️ Action:** `{log['action']}`
                """)

except Exception as e:
    st.error("❌ Failed to fetch logs.")
    st.exception(e)

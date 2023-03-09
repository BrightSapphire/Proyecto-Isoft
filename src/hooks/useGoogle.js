import { useEffect } from 'react';
import global from '../helpers/global';

const useGoogle = () => {

    useEffect(() => {

        const SCOPE = "https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.coursework.me.readonly https://www.googleapis.com/auth/classroom.coursework.students.readonly https://www.googleapis.com/auth/classroom.coursework.students https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.rosters.readonly";
        const handleClientLoad = () => window.gapi.load('client:auth2', initClient);
    
        const initClient = () => {
            const discoveryUrl = "https://classroom.googleapis.com/$discovery/rest";
            window.gapi.client.init({
                'clientId': global.clientId,
                'discoveryDocs': [discoveryUrl],
                'scope': SCOPE
            });
            console.log("Google loaded");
        };

        const script = document.createElement('script');

        script.src = "https://apis.google.com/js/api.js";
        script.async = true;
        script.defer = true;
        script.onload = handleClientLoad;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };

    }, []);
};

export default useGoogle;
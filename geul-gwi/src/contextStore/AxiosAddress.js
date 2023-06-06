import React from 'react';
import { useState } from 'react';

export const AxiosAddrContext = React.createContext({axiosAddr : 'http://172.30.1.55:8080/'})

const AxiosAddr = (children) => {
    const address = 'http://172.30.1.55:8080/';

    return (
        <AxiosAddrContext.Provider value={address}>{children}</AxiosAddrContext.Provider>
    );
}

export default AxiosAddr;
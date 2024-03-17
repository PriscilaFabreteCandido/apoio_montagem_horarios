import AuthContext from "../../context/AuthProvider";

export const AuthProvider = ({children}: any) => {
    const [user, setUser] = useState<any>();

    return <AuthContext.Provider>
        {children}
    </AuthContext.Provider>

}
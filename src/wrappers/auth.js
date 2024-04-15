import { Navigate, Outlet } from 'umi'
import { useModel } from 'umi';

export default (props) => {
    const { initialState } = useModel('@@initialState');
    const { currentUser, loading } = initialState;

    console.log(initialState)

   return<div>权限</div>
}
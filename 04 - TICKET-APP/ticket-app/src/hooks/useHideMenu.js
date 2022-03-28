import { useContext, useEffect } from 'react'
import { UIContext } from '../context/UIContext'

export const useHideMenu = (ocultar) => {

    const {showMenu, hideMenu} = useContext( UIContext );

    useEffect(() => {
      ocultar ? hideMenu() : showMenu();
    }, [ocultar, hideMenu, showMenu]);
}

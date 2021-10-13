import React, { useContext, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { ModalContext } from '../context/ModalContext';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));



const Receta = ({ receta }) => {
    const { strDrink, strDrinkThumb, idDrink } = receta;

    // Configuracion del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // extraer los vlores del context
    const { recetainfo, guardarIdReceta, guardarReceta } = useContext(ModalContext);

    //Muestra y formatea los ingredientes

    const mostraringredientes = recetainfo => {
        let ingredientes = [];

        for (let i = 1; i < 16; i++) {
            if (recetainfo[`strIngredient${i}`]) {
                ingredientes.push(
                    <li> {recetainfo[`strIngredient${i}`]} {recetainfo[`strMeasure${i}`]} </li>
                )
            }
        }

        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{strDrink}</h2>

                <img className="card-img-top" src={strDrinkThumb} />

                <div className="card-body">
                    <button
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdReceta(idDrink);
                            handleOpen();
                        }}
                    >   Ver Receta
                    </button>

                    <Modal
                        open={open}
                        onClose={() => {
                            guardarIdReceta(null);
                            guardarReceta({});
                            handleClose();
                        }}
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{recetainfo.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>
                                {recetainfo.strInstructions}
                            </p>
                            <img className="img-fluid my-4" src={recetainfo.strDrinkThumb} />
                            <h3>Ingredientes y Cantidades</h3>
                            <ul>
                                {mostraringredientes(recetainfo)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default Receta;
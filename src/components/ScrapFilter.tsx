import React from 'react';
import { observer } from 'mobx-react';
import { Grid } from '@material-ui/core';
import btCheckBoxChecked from '../assets/pngs/bt-checkbox-checked.png';
import btCheckBoxChecked2x from '../assets/pngs/bt-checkbox-checked@2x.png';
import btCheckBoxChecked3x from '../assets/pngs/bt-checkbox-checked@3x.png';
import white from '../assets/pngs/white.png';
import white2x from '../assets/pngs/white@2x.png';
import white3x from '../assets/pngs/white@3x.png';

interface ScrapFilterProps {
    title: string;
    onClick: () => void;
    isChecked: boolean;
}

const ScrapFilter = ({ title, onClick, isChecked }: ScrapFilterProps) => {
    return (
        <Grid
            container
            onClick={onClick}
            className="scrap_header"
            alignItems="center"
        >
            <Grid item className="bt_checkbox_checked">
                {isChecked ? (
                    <img
                        src={btCheckBoxChecked}
                        srcSet={`${btCheckBoxChecked2x} 2x,
                        ${btCheckBoxChecked3x} 3x`}
                        alt="bt_checkbox_checked"
                    />
                ) : (
                    <img
                        src={white}
                        srcSet={`${white2x} 2x,
                    ${white3x} 3x`}
                        className="bt_checkbox_checked"
                        alt="bt_checkbox_checked"
                    />
                )}
            </Grid>
            <Grid item>
                <span>{title}</span>
            </Grid>
        </Grid>
    );
};

export default observer(ScrapFilter);

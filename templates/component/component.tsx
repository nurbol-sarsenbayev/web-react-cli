import React from 'react';
import { %component%State } from './state';
import { %component%Props } from './props';
import { %component%View } from './%component%View';

export class %component% extends React.Component<%component%Props, %component%State> {
    static defaultProps: Partial<%component%Props> = {
        
    }

    constructor(props: %component%Props) {
        super(props);

        this.state = new %component%State();
    }

    render() {
        return (
            <%component%View
            
            />
        );
    }
}
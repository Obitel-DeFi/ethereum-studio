// Copyright 2019 Superblocks AB
//
// This file is part of Superblocks Lab.
//
// Superblocks Lab is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation version 3 of the License.
//
// Superblocks Lab is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Superblocks Lab.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import style from './style.less';
import { IDeployedContract } from '../../../../models';
import { DeployedContractItem } from './items/deployedContractItem';
import { AbiItemList } from './items/aibItemList';

interface IProps {
    deployedItems: IDeployedContract[];
    onToggleTreeItem(id: string): void;
}

export class InteractPanel extends React.Component<IProps> {
    renderItem(item: IDeployedContract) {
        return (
            <div className={style.interactContainer}>
                <div className={style.title}>Contract Address:</div>
                <div>{item.address}</div>
                <div className={style.title}>Interact:</div>
                    <AbiItemList
                        abi={item.abi}
                    />
            </div>
        );
    }

    render() {
        const { deployedItems, onToggleTreeItem } = this.props;

        if (deployedItems.length === 0) {
            return (
                <div className={style.noContracts}>
                    <p>No contracts deployed in this network</p>
                </div>
            );
        }

        return (
            <div className={ style.treeContainer }>
                {
                    deployedItems.map((item) => (
                        <DeployedContractItem key={ item.id }
                            data={item}
                            depth={0}
                            onClick={ (i: IDeployedContract) => console.log(i.id) }
                            onToggle={ onToggleTreeItem }>
                                { this.renderItem(item) }
                        </DeployedContractItem>
                    ))
                }
            </div>
        );
    }
}

import MapboxGL from '@react-native-mapbox-gl/maps';
import React from 'react';

export interface Props {
    id: string;
    tileUrlTemplates: string[],
}

export class VDBMapRasterLayer extends React.Component<Props>
{
    state={
        opacity: 1,
    };

    render(): JSX.Element
    {
        return (
            <React.Fragment>
                <MapboxGL.RasterSource
                    id={this.props.id}
                    tileUrlTemplates={this.props.tileUrlTemplates}
                    tileSize={256}
                >
                    <MapboxGL.RasterLayer
                        id={`VBD.Layer.${this.props.id}`}
                        sourceID={this.props.id}
                    />
                </MapboxGL.RasterSource>
            </React.Fragment>
        );
    }
}

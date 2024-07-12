import React, { Component } from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
import PropTypes from 'prop-types';

export interface Props {
    type: 'poi-blue' | 'poi-green' | 'poi-cyan' | 'poi-yellow' | 'poi-pink',
    name: string,
    coordinates: any,
    maxZoomLevel: number,
    onPress: (event: any) => void
}

class VBDPointAnotation extends Component<Props>
{
    propTypes = {
        type: PropTypes.oneOf(['poi-blue' , 'poi-green' , 'poi-cyan' , 'poi-yellow' , 'poi-pink']).isRequired,
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.any.isRequired,
        maxZoomLevel: PropTypes.number.isRequired,
        onPress: PropTypes.func,
    };

    state = {
        icon: {},
    }

    componentDidMount():void
    {
        switch (this.props.type)
        {
            case 'poi-blue':
                this.setState({ icon: require('../../../images/poi-blue.png') });
                break;
            case 'poi-green':
                this.setState({ icon: require('../../../images/poi-green.png') });
                break;
            case 'poi-cyan':
                this.setState({ icon: require('../../../images/poi-cyan.png') });
                break;
            case 'poi-yellow':
                this.setState({ icon: require('../../../images/poi-yellow.png') });
                break;
            case 'poi-pink':
                this.setState({ icon: require('../../../images/poi-pink.png') });
                break;
            default:
                this.setState({ icon: require('../../../images/poi-blue.png') });
                break;
        }
    }

    render():JSX.Element
    {
        const { name,coordinates,maxZoomLevel } = this.props;
        return (
            <MapboxGL.ShapeSource
                id={`point-${name}`}
                maxZoomLevel={maxZoomLevel}
                shape={{ coordinates, 'type': 'Point' }}
                onPress={(e)=>this.props.onPress && this.props.onPress(e)}
            >
                <MapboxGL.SymbolLayer
                    layerIndex={9000}
                    style={{ iconImage: this.state.icon as any, iconTranslateAnchor: 'map', iconOffset: [0, -12] }}
                    id={`point-custom-${name}`}
                />
            </MapboxGL.ShapeSource>
        );
    }
}

export default VBDPointAnotation;

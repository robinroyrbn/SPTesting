import * as React from 'react';
import styles from './NasaImgWp.module.scss';
import { INasaImgWpProps } from './INasaImgWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class NasaImgWp extends React.Component<INasaImgWpProps, {}> {
  public render(): React.ReactElement<INasaImgWpProps> {
    return (
        <div className={ styles.nasaImgWp }>
          <div className={ styles.container }>
            <div className={ styles.row }>
              <div className={ styles.column }>
                <span className={ styles.title }>HttpClient Demo</span>
              </div>
            </div>
            <div className={ styles.row }>
              <img src={ this.props.apolloMissionImage.links[0].href } />
              <div><strong>Title:</strong> { this.props.apolloMissionImage.data[0].title }</div>
              <div><strong>Keywords:</strong></div>
              <ul className={ styles.list }>
                { this.props.apolloMissionImage &&
                  this.props.apolloMissionImage.data[0].keywords.map((keyword) =>
                    <li key={ keyword} className={ styles.item }>
                      { keyword }
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
    );
  }

}

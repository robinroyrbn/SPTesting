import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'NasaImgWpWebPartStrings';
import NasaImgWp from './components/NasaImgWp';
import { INasaImgWpProps } from './components/INasaImgWpProps';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export interface INasaImgWpWebPartProps {
  description: string;
}

export default class NasaImgWpWebPart extends BaseClientSideWebPart <INasaImgWpWebPartProps> {

  public render(): void {
    if (!this.renderedOnce) {
      this._getApolloImage()
        .then(response => {
          const element: React.ReactElement<INasaImgWpProps > = React.createElement(
            NasaImgWp,
            {
              apolloMissionImage: response.collection.items[0]
            }
          );
  
          ReactDom.render(element, this.domElement);
        });
    }
  }

  private _getApolloImage(): Promise<any> {
    return this.context.httpClient.get(
      `https://images-api.nasa.gov/search?q=Apollo%204&media_type=image`,
      HttpClient.configurations.v1
    ) 
    .then((response: HttpClientResponse) => {
      return response.json();
    })
    .then(jsonResponse => {
      return jsonResponse;
    }) as Promise<any>;
  }


  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
